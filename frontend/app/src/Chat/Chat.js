import "../App.css";
import { useEffect, useState } from "react";
import socket from "../io"
import "../Chat/Style.css"
import ScrollToBottom from "react-scroll-to-bottom";
// import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Chat() {
  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState('');
  const [inputField, setinputField] = useState({
    username: '',
    room: '',
    currentMessage: '',
    time:
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes(),
  })

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    // setText(text + emoji.native);
    setinputField(inputField.currentMessage + emoji.native)
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'strike', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ['emoji', 'mention'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'strike', 'link',
    'list', 'bullet', 'indent',
    'blockquote', 'code-block',
    'script',
    'emoji', 'mention',
  ];




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
              value={inputField.username}
              placeholder="John..."
              onChange={handleInput}
            />
            <input
              type="text"
              name="room"
              value={inputField.room}
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
              <ScrollToBottom className="message-container">
                {messageList.map((item, index) => {

                  return (
                    <div
                      className="message"
                      id={inputField.username === item.username ? "you" : "other"}
                    >
                      <div>
                        <div className="message-content">
                          <p>{item.currentMessage}</p>
                        </div>
                        <div className="message-meta">
                          <p id="time">{item.time}</p>
                          <p id="author">{item.username}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </div>
            <div className="chat-footer">
              <input
                type="text"
                name="currentMessage"
                value={inputField.currentMessage}
                placeholder="Hey..."
                onChange={handleInput}

              />
              <button onClick={sendMessage}>&#9658;</button>



              {/* <div>
                <button onClick={toggleEmojiPicker}>😊</button>
                {showEmojiPicker && <Picker onSelect={handleEmojiSelect} />}
              </div>
              <ReactQuill
                value={inputField.currentMessage}
                onChange={handleInput}
                modules={modules}
                formats={formats}
                placeholder="Type your message here..."
              />
              <button onClick={() => setText('')}>Clear</button> */}
            </div>
          </div>
        )}
      </div>
    </>
  )

}
export default Chat;

