import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Anotations from './Anotations'
import NotFound from './NotFound';
import Test from './Test'
import Anotation from './Anotation'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: 'rgb(254, 255, 247)',
  },
}));

const PrivateRoute = ({component: Component, ...rest}) => {
  console.log(localStorage.getItem('isLogged') === 'true');
  return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          localStorage.getItem('isLogged') === 'true' ?
              <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
        localStorage.isLogged === 'true' && restricted ?
              <Redirect to="/profile" />
          : <Component {...props} />
      )} />
  );
};

function Main() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Signup</Link>
      <Paper className={classes.paper} elevation={2}>
        <Switch>
          <PrivateRoute exact path="/" component={Test}/>

          <PublicRoute exact path="/register" restricted={true} component={Register} />

          <PublicRoute exact path="/login" restricted={true} component={Login} />

          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/anotations" component={Anotations} />
          <PrivateRoute exact path="/profile/anotations/:id" component={Anotation} />

          <Route component={NotFound} />
        </Switch>
      </Paper>
    </Container>
  );
}

export default Main;
