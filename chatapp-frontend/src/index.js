import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './tailwind.css'; // Assuming you have a global CSS file for TailwindCSS

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
