import React from 'react';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import UserList from '../components/UserList';

function Home() {
  // This is just sample data. In a real-world scenario, you'd fetch this from your backend.
  const sampleUsers = ['Alice', 'Bob', 'Charlie'];

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex mt-4">
        <div className="w-1/4 pr-4">
          <UserList users={sampleUsers} />
        </div>
        <div className="w-3/4">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default Home;
