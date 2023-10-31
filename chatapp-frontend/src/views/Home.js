import React, { useState } from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';

function Home() {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <div className="container mx-auto p-4">
            <Header />
            <div className='flex'>
            <UserList onUserClick = {setSelectedUserId}/>
            <ChatBox selectedUserId={selectedUserId}/>
            </div>
        </div>
    );
}

export default Home;
