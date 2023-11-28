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
        <div className="relative p-4">
            <div className="cursor-pointer" onClick={handleProfileClick}>
                <img
                    src={currentUser.profileImage}
                    alt="Profile"
                    className="rounded-full w-10 h-10 border-4 border-blue-500"
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
