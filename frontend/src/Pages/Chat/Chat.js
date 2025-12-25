import { useState, useEffect } from "react";
import Sidebar from "../../Components/Home/Sidebar/Sidebar";
import "./Chat.css";
import ChatBox from "./ChatBox";
import { useParams, useNavigate } from "react-router-dom";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState({});
  const navigate = useNavigate();

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/message/${chatId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!data || data.length === 0) {
        navigate("/", { replace: true });
        return;
      }
      setMessages(data);
    } catch (err) {
      console.error(err);
      navigate("/", { replace: true });
    }
  };

  // Fetch chat details
  const fetchChatDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/chats/${chatId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setChat(data);
    } catch (e) {
      console.error(e);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchChatDetails();
  }, [chatId, navigate]);

  return (
    <div style={{ padding: "20px", height: "100vh", display: "flex" }}>
      <Sidebar />
      <div className="chat-box-and-input">
        <div className="chat-header">
          <div className="left-chat-header">
            <p className="title">{chat?.title || "Chat"}</p>
            <p className="time">
              {chat?.createdAt ? new Date(chat.createdAt).toLocaleString() : ""}
            </p>
          </div>
          <div className="right-chat-header">
            <button className="profile"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button  onClick={() => navigate("/login")}>Logout</button>
          </div>
        </div>

        {/* Chat messages */}
        <ChatBox chatId={chatId} messages={messages} />

        {/* Chat input */}
        <ChatInput chatId={chatId} onNewMessage={fetchMessages} />
      </div>
    </div>
  );
};

export default Chat;
