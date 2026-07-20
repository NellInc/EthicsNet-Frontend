import { useSoftNavigate } from '../hooks/useSoftNavigate';
import React, { useContext, useEffect, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

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

function Main() {
  const { classes } = useStyles();
  const [loading] = useContext(Loading);
  const navigate = useSoftNavigate();

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
        navigate('/logged-out');
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
          <Routes>
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />

            <Route
              path='/register'
              element={
                <PublicRouteRedirectHowtoUse restricted={true}>
                  <Register />
                </PublicRouteRedirectHowtoUse>
              }
            />

            <Route
              path='/login'
              element={
                <PublicRoute title='EthicsNet - Login' restricted={true}>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path='/about'
              element={
                <PublicRoute title='EthicsNet - About'>
                  <About />
                </PublicRoute>
              }
            />

            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />

            <Route path='/upload' element={<PrivateRoute><UploadImage /></PrivateRoute>} />
            <Route path='/save-upload-image' element={<PrivateRoute><SaveImageUpload /></PrivateRoute>} />

            {/* Type of user */}
            <Route
              path='/admin'
              element={
                <AdminRoutes title='EthicsNet - Admin'>
                  <Admin />
                </AdminRoutes>
              }
            />

            <Route path='/landing' element={<Landing />} />

            <Route
              path='/how-to-use'
              element={
                <PublicRoute title='EthicsNet - How to use'>
                  <HowToUse />
                </PublicRoute>
              }
            />

            <Route
              path='/privacy-policy'
              element={
                <PublicRoute title='EthicsNet - How to use'>
                  <PrivacyPolicy />
                </PublicRoute>
              }
            />

            <Route
              path='/terms-and-conditions'
              element={
                <PublicRoute title='EthicsNet - How to use'>
                  <TermsAndConditions />
                </PublicRoute>
              }
            />

            <Route
              path='/eula'
              element={
                <PublicRoute title='EthicsNet - How to use'>
                  <EULA />
                </PublicRoute>
              }
            />

            <Route path='/logged-out' element={<LoggedOut />} />

            <Route
              path='/profile/annotations'
              element={
                <PrivateRoute title='EthicsNet - Annotations'>
                  <Annotations />
                </PrivateRoute>
              }
            />

            {/* TODO: remove this later, this was only to */}
            {/* not break the deployed extension */}
            <Route
              path='/profile/anotations'
              element={
                <PrivateRoute title='EthicsNet - New Annotation'>
                  <Annotations />
                </PrivateRoute>
              }
            />

            <Route
              path='/annotations/new'
              element={
                <PrivateRoute title='EthicsNet - New Annotation'>
                  <NewAnnotation />
                </PrivateRoute>
              }
            />

            <Route
              path='/save-video-action'
              element={
                <PrivateRoute title='EthicsNet - Save Video Action'>
                  <SaveVideoAction />
                </PrivateRoute>
              }
            />

            <Route
              path='/profile/anotations/screenshots'
              element={
                <PrivateRoute title='EthicsNet - Screenshot'>
                  <Screenshot2 />
                </PrivateRoute>
              }
            />

            <Route
              path='/select-person-action'
              element={
                <PrivateRoute title='EthicsNet - Select person'>
                  <SelectPerson />
                </PrivateRoute>
              }
            />

            <Route
              path='/image/new'
              element={
                <PrivateRoute title='EthicsNet - New Image'>
                  <Screenshot />
                </PrivateRoute>
              }
            />

            <Route
              path='/image/save'
              element={
                <PrivateRoute title='EthicsNet - Save Image'>
                  <SaveImage />
                </PrivateRoute>
              }
            />

            <Route
              path='/video/save'
              element={
                <PrivateRoute title='EthicsNet - Save Video'>
                  <SaveVideo />
                </PrivateRoute>
              }
            />

            <Route
              path='/user/images'
              element={
                <PrivateRoute title='EthicsNet - Images'>
                  <GetImages />
                </PrivateRoute>
              }
            />

            <Route
              path='/user/videos'
              element={
                <PrivateRoute title='EthicsNet - Videos'>
                  <Videos />
                </PrivateRoute>
              }
            />

            <Route
              path='/user/images/all'
              element={
                <PrivateRoute title='EthicsNet - All Images'>
                  <GetAllImages />
                </PrivateRoute>
              }
            />

            <Route
              path='/profile/annotations/edit/:id'
              element={
                <PrivateRoute title='EthicsNet - Edit Annotation'>
                  <Anotation />
                </PrivateRoute>
              }
            />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Paper>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default Main;
