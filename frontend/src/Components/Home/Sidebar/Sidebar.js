import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatListItem from "../../Chat/Chatlistitem/Chatlistitem";
import LoadingSpinner from "../../Common/LoadingSpinner/LoadingSpinner";
import "./Sidebar.css";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chats", {
        credentials: "include",
      });
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleNewChat = async () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar_title">
        <p>Chat History</p>
      </div>
      <div className="sidebar_chats">
        {loading ? (
          <LoadingSpinner />
        ) : chats.length > 0 ? (
          chats.map((chat) => (
            <ChatListItem
              key={chat._id}
              chat={chat}
              onDeleteSuccess={(deletedId) => {
                setChats((prev) => prev.filter((c) => c._id !== deletedId));
              }}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>No chats available</p>
          </div>
        )}
      </div>

      <div className="sidebar_newchat">
        <button
          onClick={() => {
            handleNewChat();
          }}
        >
          New Chat
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
