import React, { useState } from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';
import CurrentUser from '../components/CurrentUser';

function Home() {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="relative flex flex-col rounded-xl min-w-[1500px] max-w-[1500px] my-5">
                <img
                    className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-xl"
                    src="https://i.pinimg.com/564x/6b/de/a3/6bdea3557da87eb2a3e10b53d3df19d4.jpg"
                    alt="background"
                    style={{ zIndex: -1 }}
                />
                <Header />
                <div className="flex flex-grow items-stretch justify-center w-full">
                    <div className="flex h-full w-full rounded-bl-xl rounded-br-xl overflow-hidden">
                        <div className="flex flex-col w-1/6 rounded-bl-xl bg-black/30">
                            <div className="flex-grow overflow-auto">
                                <UserList onUserSelect={setSelectedUserId} />
                            </div>
                            <div >
                                <CurrentUser />
                            </div>
                        </div>
                        <div className="flex flex-col w-5/6">
                            <ChatBox selectedUserId={selectedUserId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
