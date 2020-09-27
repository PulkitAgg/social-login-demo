import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import GoogleLogin from './components/GoogleLogin';
import Login from './components/Login';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/google-auth' component={GoogleLogin} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
