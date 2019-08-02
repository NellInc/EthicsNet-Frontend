import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function Main() {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      {/* both /roster and /roster/:number begin with /roster */}
      {/* <Route path='/roster' component={Roster}/> */}
      {/* <Route path='/schedule' component={Schedule}/> */}
    </Switch>
  );
}

export default Main;
