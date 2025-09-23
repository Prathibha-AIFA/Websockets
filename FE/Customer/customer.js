const socket = new WebSocket("ws://localhost:3000");
socket.onopen = () => {
  socket.send("customer"); // identify role as customer // this is sent as message 
  addMessage(" Connected as Customer!", "received");
};


socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.from === "chef") {
    addMessage(msg.text, "received");
  } else if (msg.from === "system") {
    addMessage(msg.text, "received"); // system messages on left too
  }
};


function sendOrder() {
  const input = document.getElementById("orderInput");
  if (input.value.trim() !== "") {
    socket.send(input.value);
    addMessage(input.value, "sent"); // show own message
    input.value = "";
  }
}
      function addMessage(msg, type) {
        const div = document.createElement("div");
        div.classList.add("message", type);
        div.textContent = msg;
        document.getElementById("messages").appendChild(div);

        // Auto-scroll
        const messages = document.getElementById("messages");
        messages.scrollTop = messages.scrollHeight;
      }