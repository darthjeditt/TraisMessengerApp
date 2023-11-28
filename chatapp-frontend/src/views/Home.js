import React, { useState } from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';

function Home() {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <div className="flex flex-col min-h-[600px] max-h-[600px] bg-gray-900 rounded-xl min-w-[1000px]">
            <Header />
            <div
                className="flex flex-grow items-center justify-center w-full"
                style={{ maxWidth: '200%' }}
            >
                {' '}
                {/* Adjust this to increase the width */}
                <div className="flex h-[600px] w-full rounded-xl bg-gray-800 shadow-lg">
                    <div className="flex flex-col w-1/6 bg-gray-800 border border-gray-700 rounded-bl-xl shadow overflow-y-auto">
                        <UserList onUserSelect={setSelectedUserId} />
                    </div>
                    <div className="flex flex-col w-5/6 bg-gray-800 border border-gray-700 rounded-br-xl shadow p-4 overflow-hidden pb-4">
                        <ChatBox selectedUserId={selectedUserId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
