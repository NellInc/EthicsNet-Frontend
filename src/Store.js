import React, { useState, createContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const theme = createMuiTheme({
  palette: {
    // primary: { main: 'rgb(255, 127, 80)' },
    primary: { main: 'rgb(49, 54, 57)' },
    // primary: { main: purple[500] },
    // primary: { main: '#32a' },
    secondary: { main: '#11cb5f' },
    // secondary: { main: '#282828' },
  },
});

// this is the default value
export const IsLogged = createContext(localStorage.isLogged);
export const Loading = createContext(true);
export const Notification = createContext('bla');

function Store({ children }) {
  const [isLogged, setIsLogged] = useState(localStorage.isLogged);
  const [loading, setLoading] = useState(true);

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
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Notification.Provider>
      </IsLogged.Provider>
    </Loading.Provider>
  );
}

export default Store;
