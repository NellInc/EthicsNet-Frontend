import React, { useContext, useEffect, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import Navbar from '../Navbar';
import Footer from '../Footer';
import Landing from '../Landing';
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
import Videos from '../Videos';
import SaveVideo from '../SaveVideo';
import HowToUse from '../HowToUse';
import SaveVideoAction from '../SaveVideoAction';
import SelectPerson from '../SaveVideoAction/SelectPerson';
import PrivacyPolicy from '../PrivacyPolicy';
import TermsAndConditions from '../TermsAndConditions';
import EULA from '../EULA';
import About from '../About';
import Admin from '../Admin';
import UploadImage from '../SaveImage/UploadImage';
import SaveImageUpload from '../SaveImage/SaveImageUpload';

import {
  PrivateRoute,
  PublicRoute,
  AdminRoutes,
  PublicRouteRedirectHowtoUse,
} from '../RoutesTypes';
import { Loading } from '../Store';
import { useStyles } from './style';

// quem trabalha demais não tem tempo pra ganhar dinheiro
// feche um ciclo, olhe o que aconteceu e veja como vc pode melhorar isso
// o tempo para a analise é fundamental

function Main(props) {
  const classes = useStyles();
  const [loading] = useContext(Loading);

  useEffect(() => {
    console.log(
      '\n\n********************************\n\nETHICSNET ALPHA VERSION: 0.0.42\n\n********************************\n\n'
    );
    var lastclear = localStorage.getItem('lastclear'),
      time_now = new Date().getTime();
    // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 * 30 = 30 days

    if (localStorage.isLogged && lastclear) {
      if (time_now - lastclear > 1000 * 60 * 60 * 24 * 30) {
        // if (time_now - lastclear > 1000 * 60) {
        // if ((time_now - lastclear) > (1000 * 60)) {
        // if (true) {
        localStorage.clear();
        localStorage.setItem('lastclear', time_now);
        props.history.push('/logged-out');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
        <Footer />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      <Container className={classes.root} maxWidth='md'>
        <Paper className={classes.paper} elevation={2}>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />

            <PublicRouteRedirectHowtoUse
              exact
              path='/register'
              restricted={true}
              component={Register}
            />

            <PublicRoute
              title='EthicsNet - Login'
              exact
              path='/login'
              restricted={true}
              component={Login}
            />

            <PublicRoute
              title='EthicsNet - About'
              exact
              path='/about'
              // restricted={true}
              component={About}
            />

            <PrivateRoute exact path='/profile' component={Profile} />

            <PrivateRoute exact path='/upload' component={UploadImage} />
            <PrivateRoute exact path='/save-upload-image' component={SaveImageUpload} />

            {/* Type of user */}
            <AdminRoutes
              exact
              path='/admin'
              title='EthicsNet - Admin'
              component={Admin}
            />

            <Route exact path='/landing' component={Landing} />

            <PublicRoute
              title='EthicsNet - How to use'
              exact
              path='/how-to-use'
              // restricted={true}
              component={HowToUse}
            />

            <PublicRoute
              title='EthicsNet - How to use'
              exact
              path='/privacy-policy'
              // restricted={true}
              component={PrivacyPolicy}
            />

            <PublicRoute
              title='EthicsNet - How to use'
              exact
              path='/terms-and-conditions'
              // restricted={true}
              component={TermsAndConditions}
            />

            <PublicRoute
              title='EthicsNet - How to use'
              exact
              path='/eula'
              // restricted={true}
              component={EULA}
            />

            <Route exact path='/logged-out' component={LoggedOut} />

            <PrivateRoute
              title='EthicsNet - Annotations'
              exact
              path='/profile/annotations'
              component={Annotations}
            />

            {/* TODO: remove this later, this was only to */}
            {/* not break the deployed extension */}
            <PrivateRoute
              title='EthicsNet - New Annotation'
              exact
              path='/profile/anotations'
              component={Annotations}
            />

            <PrivateRoute
              title='EthicsNet - New Annotation'
              exact
              path='/annotations/new'
              component={NewAnnotation}
            />

            <PrivateRoute
              title='EthicsNet - Save Video Action'
              exact
              path='/save-video-action'
              component={SaveVideoAction}
            />

            <PrivateRoute
              title='EthicsNet - Screenshot'
              exact
              path='/profile/anotations/screenshots'
              component={Screenshot2}
            />

            <PrivateRoute
              title='EthicsNet - Select person'
              exact
              path='/select-person-action'
              component={SelectPerson}
            />

            <PrivateRoute
              title='EthicsNet - New Image'
              exact
              path='/image/new'
              component={Screenshot}
            />

            <PrivateRoute
              title='EthicsNet - Save Image'
              exact
              path='/image/save'
              component={SaveImage}
            />

            <PrivateRoute
              title='EthicsNet - Save Video'
              exact
              path='/video/save'
              component={SaveVideo}
            />

            <PrivateRoute
              title='EthicsNet - Images'
              exact
              path='/user/images'
              component={GetImages}
            />

            <PrivateRoute
              title='EthicsNet - Videos'
              exact
              path='/user/videos'
              component={Videos}
            />

            <PrivateRoute
              title='EthicsNet - All Images'
              exact
              path='/user/images/all'
              component={GetAllImages}
            />

            <PrivateRoute
              title='EthicsNet - Edit Annotation'
              exact
              path='/profile/annotations/edit/:id'
              component={Anotation}
            />

            <Route component={NotFound} />
          </Switch>
        </Paper>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default withRouter(Main);
