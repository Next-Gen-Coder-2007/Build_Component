import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Chat.css";
import ChatBox from "../components/ChatBox";
import { useParams, useNavigate } from "react-router-dom";
import ChatInput from "../components/ChatInput";

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState({});
  const navigate = useNavigate();

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/message/${chatId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!data || data.length === 0) {
        return navigate("/", { replace: true });
      }

      setMessages(data);
    } catch (err) {
      console.error(err);
      return navigate("/", { replace: true });
    }
  }, [chatId, navigate]);

  const fetchChatDetails = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/chats/${chatId}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setChat(data);
    } catch (e) {
      console.error(e);
      return navigate("/", { replace: true });
    }
  }, [chatId, navigate]);

  useEffect(() => {
    fetchMessages();
    fetchChatDetails();
  }, [chatId, fetchMessages, fetchChatDetails]);

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
            <button className="profile" onClick={() => navigate("/profile")}>
              Profile
            </button>
            <button onClick={() => navigate("/login")}>Logout</button>
          </div>
        </div>

        <ChatBox chatId={chatId} messages={messages} />

        <ChatInput chatId={chatId} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Chat;