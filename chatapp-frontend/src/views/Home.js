import React from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';

function Home() {
    return (
        <div className="container mx-auto p-4">
            <Header />
            <ChatBox />
        </div>
    );
}

export default Home;
