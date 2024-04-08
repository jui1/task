import React, { useState, useRef, useEffect } from 'react';
import './Chat.css'; // Import CSS for styling (create Chat.css file)

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Dummy data for initial messages (can be replaced with actual data)
  const initialMessages = [
    { text: 'Hello!', sender: 'interviewer', timestamp: new Date() },
    { text: 'Hi there!', sender: 'student', timestamp: new Date() },
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      text: newMessage,
      sender: 'interviewer', // Assuming the interviewer sends the message
      timestamp: new Date(),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');

    // Scroll to the bottom of the chat window after sending a message
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'interviewer' ? 'interviewer' : 'student'}`}
          >
            <span className="message-text">{message.text}</span>
            <span className="message-timestamp">{formatTimestamp(message.timestamp)}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${padZero(date.getMinutes())}`;
};

const padZero = (num) => (num < 10 ? `0${num}` : num);

export default Chat;
