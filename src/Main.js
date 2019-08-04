import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';

function Main() {
  const handleLogout = e => {
    console.log('logging out!');
    localStorage.removeItem('isLogged');
  };
  return (
    <div>
      <h3>this is the header</h3>
      <button onClick={handleLogout}>log out</button>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        {/* both /roster and /roster/:number begin with /roster */}
        {/* <Route path='/roster' component={Roster}/> */}
        {/* <Route path='/schedule' component={Schedule}/> */}
      </Switch>
      <div>this is the footer</div>
    </div>
  );
}

export default Main;
