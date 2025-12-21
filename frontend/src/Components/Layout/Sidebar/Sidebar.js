import { useState, useEffect } from "react";
import ChatListItem from "../../Chat/Chatlistitem/Chatlistitem";

const Sidebar = () => {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch("https://localhost:5000/api/chats");
            const data = await response.json();
            setChats(data);
        };
        fetchChats();
    }, []);

    const handleNewChat = async () => {
        const response = await fetch("https://localhost:5000/api/chats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ messages: [] })
        });
        const newChat = await response.json();
        setChats([...chats, newChat]);
    };

    return (
        <div className="sidebar">
            <div className="sidebar_title"><p>Chat History</p></div>
            <div className="sidebar_chats">
                {chats ? chats.map((chat) => (
                    <ChatListItem chat={chat} />
                )) : <p>No chats available</p>}
            </div>
            <div className="sidebar_newchat">
                <button onClick={() => {handleNewChat()}}>New Chat</button>
            </div>
        </div>
    )
}

export default Sidebar