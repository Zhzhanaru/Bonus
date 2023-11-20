import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat, onAddChat, onDeleteChat }) => {
  const [newChatName, setNewChatName] = useState('');

  const handleAddChat = (e) => {
    e.preventDefault();
    if (newChatName.trim() !== '') {
      onAddChat(newChatName);
      setNewChatName('');
    }
  };

  const handleDeleteChat = (chatId) => {
    onDeleteChat(chatId);
  };

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} onClick={() => onSelectChat(chat)} className={chat.selected ? 'selected' : ''}>
            {chat.name}
            <button className='delete-button' onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddChat}>
        <input
          type="text"
          placeholder="Enter new chat name"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
        />
        <button type="submit">Add Chat</button>
      </form>
    </div>
  );
};

export default ChatList;
