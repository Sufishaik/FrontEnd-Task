// import React from 'react'
// import Chat from './Chat/Chat'

// function App() {
//   return (
//     <div>
//       <Chat/>
//     </div>
//   )
// }

// export default App

import React, { useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
// import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./App.css"
function App() {
  const [text, setText] = useState('');

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
    // setinputField(inputField.currentMessage + emoji.native)
  };

  const modules = {
    toolbar: [
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'strike', 'link'],
      [{ 'list': 'bullet' }, { 'list': 'ordered' }],
      ['white', 'code-block'],
      ['file-upload']
      ['image'],
      ['emoji'],
      [{ 'mention': { 'allowedChars': /^[A-Za-z\sÅÄÖåäö]*$/, 'mentionDenotationChars': ['@'], } }],
    ],
   
  };
  const modules2 = {
    toolbar: [
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'strike', 'link'],
      [{ 'list': 'bullet' }, { 'list': 'ordered' }],
      ['white', 'code-block'],
      ['file-upload']
      ['image'],
      ['emoji'],
      [{ 'mention': { 'allowedChars': /^[A-Za-z\sÅÄÖåäö]*$/, 'mentionDenotationChars': ['@'], } }],
    ],
   
  };

  const formats = [
    
    'mention'
  ];
  const formats2 = [
    
    'mention'
  ];

  return (
    <div>
       <div>
                {/* <button onClick={toggleEmojiPicker}>😊</button> */}
                {/* {showEmojiPicker && <Picker onSelect={handleEmojiSelect} />} */}
              </div>
              <ReactQuill
                value={text}
                onChange={setText}
                modules={modules}
                className='quill'
                formats={formats}
                placeholder="Type your message here..."
              />
              <button onClick={() => setText('')}>Clear</button>
              
    </div>
  )
}

export default App
