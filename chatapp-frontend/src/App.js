// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatContainer from './components/chatContainer';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/chat" component={ChatContainer} />
      </Routes>
    </Router>
  );
}

export default App;
