import { useNavigate } from "react-router-dom";

const ProfilePopup = ({ user, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout operations, e.g. clear tokens
        // localStorage.removeItem('token');
        // Redirect to the login screen
        navigate('/login', { replace: true });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white bg-opacity-10 border border-gray-300 rounded-2xl p-6 w-96 shadow-2xl backdrop-filter backdrop-blur-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">
                        {user.username}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-red-500 bg-opacity-75 text-white hover:bg-red-700 transition duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center mb-4">
                    <img
                        src={
                            'https://i.pinimg.com/564x/93/4b/4c/934b4cda17d0621f4a796cb195642a45.jpg'
                        }
                        alt="Profile"
                        className="rounded-full w-16 h-16 border-4 border-blue-500 mr-4"
                    />
                    <div>
                        <div className="text-gray-200 font-medium">
                            {user.email}
                        </div>
                        <div className="text-sm text-white p-1 rounded bg-blue-600 bg-opacity-50">
                            Status: {user.online ? 'Online' : 'Offline'}
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePopup;
