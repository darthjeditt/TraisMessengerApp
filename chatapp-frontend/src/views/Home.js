import React, { useState } from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';

function Home() {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <div className="relative flex flex-col min-h-[670px] max-h-[670px] rounded-xl min-w-[1000px] mx-auto shadow-2xl mb-12">
            <img
                className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-xl"
                src="https://i.pinimg.com/564x/6b/de/a3/6bdea3557da87eb2a3e10b53d3df19d4.jpg"
                alt='background'
                style={{ zIndex: -1 }}
            />
                <Header />
            <div className="flex flex-grow items-center justify-center w-full">
                <div className="flex h-[600px] w-full rounded-bl-xl rounded-br-xl overflow-hidden">
                    <div className="flex flex-col w-1/6  rounded-bl-xl min-h-[600px] max-h-[600px]">

                        <UserList onUserSelect={setSelectedUserId} />
                    </div>
                    <div className="flex flex-col w-5/6 min-h-[600px] max-h-[600px]">

                        <ChatBox selectedUserId={selectedUserId} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
