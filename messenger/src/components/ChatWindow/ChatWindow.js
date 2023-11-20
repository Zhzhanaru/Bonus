// ChatWindow.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatWindow = ({ selectedChat, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (selectedChat && newMessage.trim() !== '') {
      onSendMessage(selectedChat.id, 'Zhanaru', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-window">
      <h2 className='chatname'>
        {selectedChat ? `Chat with ${selectedChat.name}` : 'Select a chat'}
        <div className="line"></div>
      </h2>
      <div className="message-list">
        {messages.map(message => (
          <div key={message.id} className="message">
            <strong>{message.sender}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <textarea
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatWindow;
