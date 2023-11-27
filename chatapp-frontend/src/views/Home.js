import React, { useState } from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';

function Home() {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <div className="container mx-auto p-4">
            <Header />
            <div className="flex">
                <div className='flex-1 bg-gray-100 p-4 border-r'>
                    <UserList onUserSelect={setSelectedUserId} />
                </div>
                <div className='flex-3 p-4'>
                    <ChatBox selectedUserId={selectedUserId} />
                </div>
            </div>
        </div>
    );
}

export default Home;
