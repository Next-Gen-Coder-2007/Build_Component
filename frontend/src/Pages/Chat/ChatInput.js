import { useState } from "react";
import "./ChatInput.css";

const ChatInput = ({ chatId, onNewMessage }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ chatId, message }),
      });

      const data = await res.json();
      console.log(data);

      if (data && data._id) {
        onNewMessage();
      }

      setMessage("");
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="chat-input-new">
      <input
        type="text"
        placeholder="Enter something to start the Chat ..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !loading && handleSendMessage()}
      />
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
