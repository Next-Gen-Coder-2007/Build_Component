import "../styles/ChatBox1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (!message.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("https://build-component.onrender.com/api/chats", {
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

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      const res = await fetch("https://build-component.onrender.com/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }

    setLoggingOut(false);
  };

  return (
    <div className="chat-box">
      <button className="profile-btn" onClick={() => navigate("/profile")}>
        Profile
      </button>
      <div className="logout">
        <button onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
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
