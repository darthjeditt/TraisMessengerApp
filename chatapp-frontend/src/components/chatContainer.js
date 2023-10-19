import React from 'react';
import ChatHeader from './chatHeader';
import ChatMessages from './chatMsg';
import ChatInput from './inputBox';

function ChatContainer() {
    return (
        <div className="bg-white p-4 rounded shadow-md w-96">
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
        </div>
    );
}

export default ChatContainer;
