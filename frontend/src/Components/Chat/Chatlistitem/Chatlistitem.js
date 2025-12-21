const Chatlistitem = ({ chat }) => {
    return (
        <div className="chatlistitem">
            <p>{chat.title}</p>
            <p>{chat.description}</p>
        </div>
    )
}

export default Chatlistitem