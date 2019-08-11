import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Container from '@material-ui/core/Container';

import Navbar from './Navbar';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Anotations from './Anotations';
import NotFound from './NotFound';
import Test from './Test';
import Anotation from './Anotation';

import { PrivateRoute, PublicRoute } from './RoutesTypes';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    maxWidth: '800px',
    margin: '20px auto',
    // backgroundColor: 'rgb(254, 255, 247)',
  },
}));

function Main() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Paper className={classes.paper} elevation={2}>
          <Switch>
            <PrivateRoute exact path="/" component={Test} />

            <PublicRoute
              exact
              path="/register"
              restricted={true}
              component={Register}
            />

            <PublicRoute
              exact
              path="/login"
              restricted={true}
              component={Login}
            />

            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute
              exact
              path="/profile/anotations"
              component={Anotations}
            />
            <PrivateRoute
              exact
              path="/profile/anotations/edit/:id"
              component={Anotation}
            />

            <Route component={NotFound} />
          </Switch>
        </Paper>
      </Container>

      <Footer />
    </>
  );
}

export default Main;
