import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import NotFound from './NotFound';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: 'rgb(254, 255, 247)',
  },
}));

function Main() {
  const classes = useStyles();
  const handleLogout = e => {
    console.log('logging out!');
    localStorage.removeItem('isLogged');
  };

  return (
    <Container maxWidth="md">
      {/* <button onClick={handleLogout}>log out</button> */}
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Signup</Link>
      <Paper className={classes.paper} elevation={2}>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Paper>
    </Container>
  );
}

export default Main;
