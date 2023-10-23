import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const BASE_URL = 'http://localhost:5000';
const socket = io(BASE_URL);

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/chat/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Listen for real-time messages from the server
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      // Emit the new message event to the server
      socket.emit('send_message', newMessage);
      setNewMessage(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatBox;
