import { useEffect, useRef, useState } from "react";
import "../chef.css";

const Chef = () => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000");

    socketRef.current.onopen = () => {
      socketRef.current.send("chef"); // identify as chef
      addMessage("Connected as Chef!", "system");
    };

    socketRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.from === "customer" || msg.from === "system") {
        addMessage(msg.text, msg.from);
      }
    };

    return () => socketRef.current?.close();
  }, []);

  const addMessage = (text, from) => {
    setMessages((prev) => [...prev, { text, from }]);
  };

  const handleReply = () => {
    if (input.trim() !== "") {
      socketRef.current.send(input);
      addMessage(input, "chef"); // mark as sent by chef
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chef</div>
      <div className="chat-messages">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`message ${
              message.from === "chef" ? "sent" : "received"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a reply..."
        />
        <button onClick={handleReply}>Send</button>
      </div>
    </div>
  );
};

export default Chef;
