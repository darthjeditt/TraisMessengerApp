import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:3000";

function ChatInput() {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Don't send empty messages
        const socket = socketIOClient(ENDPOINT);
        socket.emit('send_message', { content: message });
        setMessage(''); // Clear the input field after sending
        try {
            const response = await fetch('/api/chat/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: message })
            });

            const data = await response.json();
            if (data) {
                setMessage(''); // Clear the input field after sending
                // TODO: Update the chat messages list in real-time (e.g., using websockets)
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-input p-3 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 rounded border border-gray-300 mr-2"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-black rounded"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatInput;
