import './ChatBox.css';
import { useState } from 'react';

const ChatBox = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    const chatId = await fetch("https://localhost:5000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("New chat created with ID:", data.id);
      return data.id;
    })
    .catch((error) => {
      console.error("Error creating new chat:", error);
    });
  }

  return (
    <div className="chat-box">
      <h1>New Chat</h1>
      <div className="chat-input">
        <input type="text" placeholder='Enter something to start the Chat ...' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatBox