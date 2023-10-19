import React, { useState, useEffect } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from backend
        fetch('/api/data')
            .then(response => response.json())
            .then(data => setData(data.message));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="p-6 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">React Frontend</h1>
                <p className="text-gray-600">{data || "Loading data from backend..."}</p>
            </div>
        </div>
    );
}

export default App;
