import './ChatBox.css';

const ChatBox = () => {
  return (
    <div className="chat-box">
      <h1>New Chat</h1>
      <div className="chat-input">
        <input type="text" placeholder='Enter something to start the Chat ...'/>
        <button>Send</button>
      </div>
    </div>
  )
}

export default ChatBox