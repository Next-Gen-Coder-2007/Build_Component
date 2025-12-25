import { useNavigate } from "react-router-dom";
import "../styles/Chatlistitem.css";

const Chatlistitem = ({ chat, onDeleteSuccess }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/chats/${chat._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.ok || response.status === 404) {
        const data = response.ok ? await response.json() : null;
        console.log("Deleted chat:", data);
        onDeleteSuccess(chat._id);
      } else {
        console.error("Failed to delete chat:", response.status);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <div className="chatlistitem" onClick={() => navigate(`/${chat._id}`)}>
      <div className="chat-info">
        <p className="chat-title">{chat.title}</p>
        <p className="chat-date">{new Date(chat.createdAt).toLocaleString()}</p>
      </div>

      <button
        className="delete-btn"
        onClick={async (e) => {
          e.stopPropagation();
          await handleDelete();
          navigate("/");
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Chatlistitem;