import { useEffect, useRef } from 'react';
import '../customer.css';

const Customer = () => {
  const socketRefCustomer = useRef();

  useEffect(() => {
    socketRefCustomer.current = new WebSocket("ws://localhost:3000");

    socketRefCustomer.current.onopen = () => {
      socketRefCustomer.current.send("customer"); // identify role
      addMessage(" Connected as Customer!", "received");
    };

    socketRefCustomer.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.from === "chef" ) {
        addMessage(msg.text, "received");
      }
    };

    return () => {
      socketRefCustomer.current?.close();
    };
  }, []);

  function addMessage(msg, type) {
    const div = document.createElement("div");
    div.classList.add("message", type);
    div.textContent = msg;
    document.getElementById("messages").appendChild(div);

    // Auto-scroll
    const messages = document.getElementById("messages");
    messages.scrollTop = messages.scrollHeight;
  }

  const handleOrder = () => {
    const input = document.getElementById("orderInput");
    if (input.value.trim() !== "") {
      socketRefCustomer.current.send(input.value);
      addMessage(input.value, "sent"); // show own message
      input.value = "";
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">👨‍🍳 Customer</div>
      <div id="messages" className="chat-messages"></div>
      <div className="chat-input">
        <input id="orderInput" placeholder="Type a reply to chef..." />
        <button onClick={handleOrder}>Send</button>
      </div>
    </div>
  );
};

export default Customer;
