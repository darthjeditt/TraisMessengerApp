import React from 'react';

// Header component for Trai's Messenger Application
const Header = () => {
    return (
        <header className="p-4 text-center text-white rounded-tl-xl rounded-tr-xl bg-black/30">
            <h1 className="text-3xl font-bold tracking-wide transform hover:scale-105 transition duration-500 ease-in-out">
                Welcome to Trai's Messenger
            </h1>
        </header>
    );
};

export default Header;
