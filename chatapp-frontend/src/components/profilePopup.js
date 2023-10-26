import React from 'react';

function ProfilePopup({ user, onClose }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-md">
                <button onClick={onClose}>X</button>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
            </div>
        </div>
    );
}

export default ProfilePopup;
