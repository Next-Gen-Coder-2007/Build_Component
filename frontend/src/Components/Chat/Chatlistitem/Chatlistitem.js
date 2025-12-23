const Chatlistitem = ({ chat }) => {
    return (
        <div className="chatlistitem">
            <p>{chat.title}</p>
            <p>{chat.createdAt}</p>
        </div>
    )
}

export default Chatlistitem