require('dotenv').config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const connectDB = require('./db');
const Notification = require('./src/model/notification');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

connectDB();

// Map of connected clients: key = role-userId, value = WebSocket
const clients = new Map();

// WebSocket connection handler
wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "AUTH") {
      const clientKey = `${data.role}-${data.userId}`;
      clients.set(clientKey, ws);

      ws.userId = data.userId;
      ws.role = data.role;

      console.log(`User connected: ${data.role} ${data.userId}`);

      // Send old notifications for this user-role
      Notification.find({ userId: data.userId, role: data.role })
        .sort({ createdAt: 1 })
        .then(notifs => {
          ws.send(JSON.stringify({
            type: "INIT_NOTIFICATIONS",
            notifications: notifs
          }));
        });
    }
  });

  ws.on("close", () => {
    if (ws.userId && ws.role) {
      const clientKey = `${ws.role}-${ws.userId}`;
      clients.delete(clientKey);
      console.log(`User disconnected: ${ws.role} ${ws.userId}`);
    }
  });
});



// MongoDB Change Stream to send real-time notifications
Notification.watch().on("change", (change) => {
  if (change.operationType === "insert") {
    const notif = change.fullDocument;
    const clientKey = `${notif.role}-${notif.userId}`;
    const ws = clients.get(clientKey);

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ 
        type: "NOTIFICATION", 
        message: notif.message, 
        time: new Date(notif.createdAt).toLocaleTimeString() 
      }));
      console.log(`Notification sent to ${notif.role} ${notif.userId}`);
    }
  }
});


app.post("/notify/:role/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const role = req.params.role; 
  const message = req.body.message || `Notification for ${role} ${userId}`;

  try {
    const notification = new Notification({ userId, role, message });
    await notification.save(); 
    console.log(`Notification saved in DB for ${role} ${userId}`);
    res.status(201).json(notification);
  } catch (error) {
    console.error("Error in /notify route:", error);
    res.status(500).json({ error: "Failed to create notification", details: error.message });
  }
});

app.get("/", (req, res) => res.send("WebSocket Notification Server Running"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
