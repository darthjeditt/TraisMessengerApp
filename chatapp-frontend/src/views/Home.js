import React, { useState } from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';

function Home() {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <div className="flex flex-col min-h-[600px] max-h-[600px] bg-gray-900 rounded-xl min-w-[1000px] mx-auto shadow-2xl">
            <div className='bg-gradient-to-b from-green-500 to-blue-500 rounded-xl'>
            <Header />
            </div>
            <div className="flex flex-grow items-center justify-center w-full">
                <div className="flex h-[600px] w-full bg-gray-800 rounded-bl-xl rounded-br-xl shadow-inner overflow-hidden">
                    <div className="flex flex-col w-1/6  rounded-bl-xl shadow-lg overflow-y-auto">
                        <UserList onUserSelect={setSelectedUserId} />
                    </div>
                    <div className="flex flex-col w-5/6">
                        <ChatBox selectedUserId={selectedUserId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
