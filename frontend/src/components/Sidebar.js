import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatListItem from "./Chatlistitem";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const response = await fetch("http://build-component.onrender.com/api/chats", {
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

  const handleNewChat = () => {
    navigate("/");
  };

  return (
    <>
      <div className={`mobile-menu-icon ${isOpen ? "hide" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        ☰
      </div>

      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
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
            <div className="no-chats">
              <p>No chats available</p>
            </div>
          )}
        </div>

        <div className="sidebar_newchat">
          <button onClick={handleNewChat}>New Chat</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
