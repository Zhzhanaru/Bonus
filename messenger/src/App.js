// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from '../src/components/Chatlist/ChatList';
import ChatWindow from '../src/components/ChatWindow/ChatWindow';
import './Style.styles.css';

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/chats')
      .then(response => setChats(response.data));
  }, []);

  const handleAddChat = (newChatName) => {
    axios.post('http://localhost:3001/chats', { name: newChatName, selected: false })
      .then(response => {
        setChats([...chats, response.data]);
        setSelectedChat(response.data);
        fetchMessages(response.data.id);
      })
      .catch(error => {
        console.error('Error adding chat:', error);
      });
  };

  const handleDeleteChat = (chatId) => {
    axios.delete(`http://localhost:3001/chats/${chatId}`)
      .then(() => {
        const updatedChats = chats.filter(chat => chat.id !== chatId);
        setChats(updatedChats);

        if (selectedChat && selectedChat.id === chatId) {
          setSelectedChat(null);
          setMessages([]);
        }
      })
      .catch(error => {
        console.error('Error deleting chat:', error);
      });
  };

  const fetchMessages = (chatId) => {
    axios.get(`http://localhost:3001/messages?chatId=${chatId}`)
      .then(response => setMessages(response.data))
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  };

  const handleSendMessage = (chatId, sender, text) => {
    axios.post('http://localhost:3001/messages', { chatId, sender, text })
      .then(response => {
        setMessages([...messages, response.data]);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.id);
  };

  return (
    <div className="app-container">
      <ChatList chats={chats} onSelectChat={handleSelectChat} onAddChat={handleAddChat} onDeleteChat={handleDeleteChat} />
      <ChatWindow selectedChat={selectedChat} messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
