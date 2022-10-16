const Message = ({ message, actionMessage, action }) => {
    return (
        <div className="messageContainer">
            <span className="message">{message}</span>
            <span className="action" onClick={action}>{actionMessage}</span>
        </div>
    )

}

export default Message