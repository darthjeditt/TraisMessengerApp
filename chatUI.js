import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

function ChatUI() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:3000');
        websocket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };
        setWs(websocket);
        return () => websocket.close();
    }, []);

    const sendMessage = () => {
        if (ws) {
            ws.send(message);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="border p-4 m-4">
                {messages.map((msg, index) => (
                    <p key={index} className="p-2">
                        {msg}
                    </p>
                ))}
            </div>
            <input
                className="border p-2 m-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button
                className="bg-blue-500 text-white p-2 m-2"
                onClick={sendMessage}
            >
                Send
            </button>
        </div>
    );
}
