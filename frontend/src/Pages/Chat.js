import { useState } from "react"
import "./Chat.css"

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    
    return (
        <div className="chat-box">

        </div>
    )
}

export default Chat