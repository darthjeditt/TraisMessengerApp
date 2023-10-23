import React, { useState, useEffect } from 'react';
import { fetchMessages } from '../utils/api'; // Assuming you have this function

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    async function loadMessages() {
      const data = await fetchMessages();
      setMessages(data);
    }
    loadMessages();
  }, []);

  const handleSendMessage = () => {
    // Here, you'd typically send the new message to your backend
    // For now, we'll just append it locally
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="overflow-y-auto h-64 mb-4">
        {messages.map((message, index) => (
          <p key={index} className="text-gray-700 border-b p-2">
            {message}
          </p>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
