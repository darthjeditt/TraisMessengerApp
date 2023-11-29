import React, { useState, useEffect } from 'react';
import ProfilePopup from './profilePopup';
import { getCurrentUser } from '../utils/api';

const CurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    useEffect(() => {
        // Fetch current user details and set state
        const fetchCurrentUser = async () => {
            const userDetails = await getCurrentUser();
            setCurrentUser(userDetails);
        };

        fetchCurrentUser();
    }, []);

    const handleProfileClick = () => {
        setShowProfilePopup(!showProfilePopup);
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative p-4 flex items-center">
            <div
                className="cursor-pointer shadow-xl rounded-full"
                onClick={handleProfileClick}
            >
                <img
                    src={
                        'https://i.pinimg.com/564x/93/4b/4c/934b4cda17d0621f4a796cb195642a45.jpg'
                    }
                    alt="Profile"
                    className="rounded-full w-26 h-26 border-4 border-blue-500 mx-auto"
                />
            </div>
            {showProfilePopup && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <ProfilePopup
                        user={currentUser}
                        onClose={() => setShowProfilePopup(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default CurrentUser;
