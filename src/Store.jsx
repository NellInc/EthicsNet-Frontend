import React, { useState, createContext } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster, toast } from 'sonner';

const theme = createTheme({
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

  const addNotification = (message, title = '', type = 'success') => {
    if (type === 'danger' || type === 'error') {
      toast.error(title ? `${title}: ${message}` : message);
    } else {
      toast.success(message);
    }
  };

  return (
    <Loading.Provider value={[loading, setLoading]}>
      <IsLogged.Provider value={[isLogged, setIsLogged]}>
        <Toaster position="top-right" richColors />
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
