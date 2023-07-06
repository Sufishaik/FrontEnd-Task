import "./App.css";

import { useEffect, useState } from "react";
// import io from "socket.io-client";

import "./Chat/Style.css";
import socket from "./io";

// const socket = io("http://localhost:5000");

function App() {
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [inputField, setinputField] = useState({
    username: '',
    room: '',
    currentMessage: '',
  })
  const handleInput = (e) => {
    setinputField({
      ...inputField,
      [e.target.name]: e.target.value
    })
  }
  const joinRoom = () => {
    socket.emit('join', inputField.room)
    setShowChat(true)
  };
  useEffect(() => {
    socket.on('receive', (data) => {
      setMessageList([...messageList, data]);
    })
  })
  const sendMessage = async () => {
    console.log(inputField)
    await socket.emit('sent_message', inputField);
    setMessageList([...messageList, inputField])
  }

 console.log(messageList)
  return (
    <>

      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h3>Join A Chat</h3>
            <input
              type="text"
              name="username"
              placeholder="John..."
              onChange={handleInput}
            />
            <input
              type="text"
              name="room"
              placeholder="Room ID..."
              onChange={handleInput}

            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (

          <div className="chat-window">
            <div className="chat-header">
              <p>Live Chat</p>
            </div>
            <div className="chat-body">

              {/* {messageList.map((messageContent) => {

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
              })} */}

            </div>
            <div className="chat-footer">
              <input
                type="text"
                name="currentMessage"
                
                placeholder="Hey..."
                onChange={handleInput}

              />
              <button onClick={sendMessage}>&#9658;</button>
            </div>
          </div>
        )}
      </div>
    </>
  )

}
export default App;

