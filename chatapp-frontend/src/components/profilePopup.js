import React from 'react';

function ProfilePopup({ user, onClose }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
                <button onClick={onClose} className="float-right">X</button>
                <h2 className="text-xl font-bold mb-2">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
            </div>
        </div>
    );
}

export default ProfilePopup;
