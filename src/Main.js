import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import Home from './Home';
import LoggedOut from './LoggedOut';
import NewAnotation from './NewAnotation'

import { PrivateRoute, PublicRoute } from './RoutesTypes';
import { Loading } from './Store';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 'calc(100vh - 128px)',
  },
  paper: {
    padding: theme.spacing(3, 2),
    maxWidth: '800px',
    margin: '20px auto',
    // backgroundColor: 'rgb(254, 255, 247)',
  },
  loaderWrapper: {
    height: 'calc(100vh - 98px)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Main() {
  const classes = useStyles();

  const [loading, setLoading] = useContext(Loading);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container className={classes.root} maxWidth="md">
        <Paper className={classes.paper} elevation={2}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />

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

            <Route exact path="/logged-out" component={LoggedOut} />

            <PrivateRoute
              exact
              path="/profile/anotations"
              component={Anotations}
            />

            <PrivateRoute
              exact
              path="/anotations/new"
              component={NewAnotation}
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
