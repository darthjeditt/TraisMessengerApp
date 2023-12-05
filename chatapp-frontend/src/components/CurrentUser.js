import React, { useState, useEffect } from 'react';
import ProfilePopup from './profilePopup';
import { getCurrentUser } from '../utils/api';

// Component to display the current user's profile and handle profile popup
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isProfilePopupVisible, setProfilePopupVisibility] = useState(false);

    // Effect to fetch and set the current user's details
    useEffect(() => {
        const fetchAndSetCurrentUser = async () => {
            const userDetails = await getCurrentUser();
            setUser(userDetails);
        };

        fetchAndSetCurrentUser();
    }, []);

    // Toggles the visibility of the profile popup
    const toggleProfilePopup = () => {
        setProfilePopupVisibility(!isProfilePopupVisible);
    };

    // Display loading state until user data is fetched
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative flex items-center justify-center p-4 bg-black/30 h-full">
            <div
                className="cursor-pointer shadow-xl rounded-full"
                onClick={toggleProfilePopup}
            >
                <img
                    src="https://i.pinimg.com/564x/93/4b/4c/934b4cda17d0621f4a796cb195642a45.jpg"
                    alt="User Profile"
                    className="rounded-full w-16 h-16 border-4 border-blue-500"
                />
            </div>
            {isProfilePopupVisible && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <ProfilePopup
                        user={user}
                        onClose={() => setProfilePopupVisibility(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default UserProfile;
