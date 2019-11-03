import React, { useState, createContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// import { purple } from '@material-ui/core/colors';
import red from '@material-ui/core/colors/red';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const theme = createMuiTheme({
  palette: {
    primary: { main: 'rgb(49, 54, 57)' },
    secondary: { main: '#11cb5f' },
  },
});

// this is the default value
export const IsLogged = createContext(localStorage.isLogged);
export const Loading = createContext(true);
export const Notification = createContext('bla');
export const ImageToSave = createContext('');
export const VideoInfoContext = createContext({});

function Store({ children }) {
  const [isLogged, setIsLogged] = useState(localStorage.isLogged);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const [videoInfo, setVideoInfo] = useState({});

  const notificationDOMRef = React.createRef();

  const addNotification = (message, title = '', type = 'success') => {
    notificationDOMRef.current.addNotification({
      title,
      message,
      type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 3000 },
      dismissable: { click: true },
    });
  };

  return (
    <Loading.Provider value={[loading, setLoading]}>
      <IsLogged.Provider value={[isLogged, setIsLogged]}>
        <ReactNotification ref={notificationDOMRef} />
        <Notification.Provider value={addNotification}>
          <ImageToSave.Provider value={[image, setImage]}>
            <VideoInfoContext.Provider value={[videoInfo, setVideoInfo]}>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </VideoInfoContext.Provider>
          </ImageToSave.Provider>
        </Notification.Provider>
      </IsLogged.Provider>
    </Loading.Provider>
  );
}

export default Store;
