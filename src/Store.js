import React, { useState, createContext } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
    // primary: { main: 'rgb(255, 127, 80)' },
    secondary: { main: '#11cb5f' },
  },
});

// this is the default value
export const IsLogged = createContext(localStorage.isLogged);
export const Loading = createContext(true);

function Store({ children }) {
  const [isLogged, setIsLogged] = useState(localStorage.isLogged);
  const [loading, setLoading] = useState(true);

  return (
    <Loading.Provider value={[loading, setLoading]}>
      <IsLogged.Provider value={[isLogged, setIsLogged]}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </IsLogged.Provider>
    </Loading.Provider>
  );
}

export default Store;
