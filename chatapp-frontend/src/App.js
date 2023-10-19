// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChatContainer from './components/chatContainer';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/chat" component={ChatContainer} />
      </Switch>
    </Router>
  );
}

export default App;
