const socket = new WebSocket("ws://localhost:3000");

      socket.onopen = () => {
        socket.send("chef"); // identify as chef
        addMessage(" Connected as Chef!", "received");
      };

socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.from === "customer") {
    addMessage(msg.text, "received");
  } else if (msg.from === "system") {
    addMessage(msg.text, "received");
  }
};


function sendReply() {
  const input = document.getElementById("msgInput");
  if (input.value.trim() !== "") {
    socket.send(input.value);
    addMessage(input.value, "sent"); // chef’s own message on right
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