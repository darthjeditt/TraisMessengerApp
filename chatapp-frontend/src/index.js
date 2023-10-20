import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={App} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
