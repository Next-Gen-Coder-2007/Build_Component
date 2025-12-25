import ChatMessage from "../../Components/Chat/ChatMessage/ChatMessage";
import "./ChatBox.css";

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-container">
      {messages.map((msg) => (
        <ChatMessage
          key={msg._id}
          role={msg.role}
          text={msg.prompt}
          explanation={msg.explanation}
          component={msg.component}
        />
      ))}
    </div>
  );
};

export default ChatBox;