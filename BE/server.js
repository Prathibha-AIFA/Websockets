const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let customer = null;
let chef = null;

wss.on("connection", (ws) => {
  console.log("A client connected...");


    ws.once("message", (msg) => {  //socket.send("msg")
            const role = msg.toString();

            if (role === "customer") {
            customer = ws;
            console.log("Customer connected ");
            ws.send(JSON.stringify({ from: "system", text: "Welcome customer! " }));
            } 
            else if (role === "chef") {
            chef = ws;
            console.log("Chef connected");
            ws.send(JSON.stringify({ from: "system", text: "Welcome chef!" }));
            }
    
                    ws.on("message", (message) => {
                    console.log(`[${role}] says: ${message}`);

                    if (role === "customer" && chef) {
                        chef.send(JSON.stringify({ from: "customer", text: message.toString() }));
                    }

                    if (role === "chef" && customer) {
                        customer.send(JSON.stringify({ from: "chef", text: message.toString() }));
                    }
                    });
    });


  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

app.get("/", (req, res) => {
  res.send("Pizza Shop WebSocket Server Running ");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("server running")
});
