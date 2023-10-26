import React from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';

function Home() {
    // This is just sample data. In a real-world scenario, you'd fetch this from your backend.

    return (
        <div className="container mx-auto p-4">
            <Header />
            <ChatBox />
        </div>
    );
}

export default Home;
