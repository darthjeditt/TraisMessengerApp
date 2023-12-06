import React, { useState } from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';
import CurrentUser from '../components/CurrentUser';

// Home component - serves as the main layout for the chat application
const Home = () => {
    // State to track the currently selected user in the chat
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
            <MainContainer>
                <BackgroundImage />
                <Header />
                <ContentArea
                    selectedUserId={selectedUserId}
                    onUserSelect={setSelectedUserId}
                />
            </MainContainer>
        </div>
    );
};

// Main container for the home layout
const MainContainer = ({ children }) => (
    <div className="relative flex flex-col rounded-xl min-w-[1500px] max-w-[1500px] my-5">
        {children}
    </div>
);

// Background image component for the home layout
const BackgroundImage = () => (
    <img
        className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-xl"
        src="https://i.pinimg.com/564x/6b/de/a3/6bdea3557da87eb2a3e10b53d3df19d4.jpg"
        alt="background"
        style={{ zIndex: -1 }}
    />
);

// Content area containing user and chat areas
const ContentArea = ({ selectedUserId, onUserSelect }) => (
    <div className="flex flex-grow items-stretch justify-center w-full">
        <div className="flex h-full w-full rounded-bl-xl rounded-br-xl overflow-hidden">
            <UserArea onUserSelect={onUserSelect} />
            <ChatArea selectedUserId={selectedUserId} />
        </div>
    </div>
);

// User area component displaying the list of users and the current user profile
const UserArea = ({ onUserSelect }) => (
    <div className="flex flex-col w-1/6 rounded-bl-xl bg-black/30">
        <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent hover:scrollbar-thumb-blue-600 scrollbar-thumb-rounded">
            <UserList onUserSelect={onUserSelect} />
        </div>
        <CurrentUser />
    </div>
);

// Chat area component displaying the chat box for the selected user
const ChatArea = ({ selectedUserId }) => (
    <div className="flex flex-col w-5/6">
        <ChatBox selectedUserId={selectedUserId} />
    </div>
);

export default Home;
