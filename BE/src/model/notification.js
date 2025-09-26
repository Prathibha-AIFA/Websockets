const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: Number, required: true },  
  role: { 
    type: String, 
    enum: ["client", "hr", "manager", "admin"], 
    required: true 
  },  
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
