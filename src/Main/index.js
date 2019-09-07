import React, { useContext, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import Navbar from '../Navbar';
import Footer from '../Footer';
import Landing from '../Landing'
import Register from '../Register';
import Login from '../Login';
import Profile from '../Profile';
import Annotations from '../Annotations';
import NotFound from '../NotFound';
import Anotation from '../Annotation';
import Home from '../Home';
import LoggedOut from '../LoggedOut';
import NewAnnotation from '../NewAnnotation';
import Screenshot from '../Screenshot';
import Screenshot2 from '../Screenshot/Screenshot2';
import SaveImage from '../SaveImage';
import GetImages from '../GetImages';
import GetAllImages from '../GetAllImages';

import { PrivateRoute, PublicRoute } from '../RoutesTypes';
import { Loading } from '../Store';
import { useStyles } from './style';

function Main(props) {
  const classes = useStyles();
  const [loading] = useContext(Loading);

  useEffect(() => {
    var lastclear = localStorage.getItem('lastclear'),
    time_now  = (new Date()).getTime();
    console.log('time now -> ', time_now);
    // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 * 30 = 30 days
    if ((time_now - lastclear) > (1000 * 60 * 60 * 24 * 30)) {
    // if ((time_now - lastclear) > (1000 * 60)) {
    // if (true) {
      localStorage.clear();
      localStorage.setItem('lastclear', time_now);
      props.history.push('/logged-out')
      console.log('logging out!');      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

            <Route exact path="/landing" component={Landing} />

            <Route exact path="/logged-out" component={LoggedOut} />

            <PrivateRoute
              exact
              path="/profile/annotations"
              component={Annotations}
            />

            {/* TODO: remove this later, this was only to */}
            {/* not break the deployed extension */}
            <PrivateRoute
              exact
              path="/profile/anotations"
              component={Annotations}
            />

            <PrivateRoute
              exact
              path="/annotations/new"
              component={NewAnnotation}
            />

            <PrivateRoute
              exact
              path="/profile/anotations"
              component={Screenshot2}
            />

            <PrivateRoute exact path="/image/new" component={Screenshot} />

            <PrivateRoute exact path="/image/save" component={SaveImage} />

            <PrivateRoute exact path="/user/images" component={GetImages} />

            {/* TODO: Better use pagination here */}
            <PrivateRoute exact path="/user/images/all" component={GetAllImages} />

            <PrivateRoute
              exact
              path="/profile/annotations/edit/:id"
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

export default withRouter(Main);
