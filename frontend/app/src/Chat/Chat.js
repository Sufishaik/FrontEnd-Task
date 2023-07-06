import React, { useEffect, useState } from "react";
import "../Chat/Style.css";
import axios from "axios";

function Chat({socket, username, room}) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket.on('receive', (data) => {
       setMessageList([...messageList, data]);
    })
  })
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room : room,
        message: currentMessage,
      };

    
      await  socket.emit('sent_message' , messageData)
      console.log(currentMessage)
    }
  }  
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
      
        {messageList.map((messageContent) => {
         
          return (
            <div
              className="message"
            >
              <div>
                <div className="message-content">
                  <p>{messageContent}</p>
                </div>
              
              </div>
            </div>
          );
        })}
     
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
         
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;