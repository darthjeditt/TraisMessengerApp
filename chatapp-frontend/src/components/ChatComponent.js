import React, { useState, useEffect } from 'react';
import socket from './path-to-socket.js'; // Adjust the path

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for new messages
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('send_message', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default ChatComponent;
