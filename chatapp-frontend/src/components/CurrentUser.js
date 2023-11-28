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
        <div className="relative flex items-center justify-center p-4">
            <div className="cursor-pointer" onClick={handleProfileClick}>
                <img
                    src={currentUser.profileImage}
                    alt="Profile"
                    className="rounded-full w-10 h-10 border-2 border-blue-500"
                />
            </div>

            {showProfilePopup && (
                <ProfilePopup
                    user={currentUser}
                    onClose={() => setShowProfilePopup(false)}
                />
            )}
        </div>
    );
};

export default CurrentUser;
