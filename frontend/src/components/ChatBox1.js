import "../styles/ChatBox1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (!message.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("http://build-component.onrender.com/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log(data);

      if (data && data.newChatId) {
        navigate(`/${data.newChatId}`);
      }

      setMessage("");
    } catch (err) {
      console.error(err);
    }
    setSending(false);
  };

  return (
    <div className="chat-box">
      <button className="profile-btn" onClick={() => navigate("/profile")}>
        Profile
      </button>
      <div className="logout">
        <button onClick={() => navigate("/login")}>Logout</button>
      </div>
      <h1>New Chat</h1>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Enter something to start the Chat ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !sending && handleSendMessage()
          }
        />
        <button onClick={handleSendMessage} disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
