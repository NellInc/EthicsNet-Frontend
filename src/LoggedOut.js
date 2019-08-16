import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { IsLogged } from './Store';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
}));

function LoggedOut(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useContext(IsLogged);

  useEffect(() => {
    async function fetchData() {
      console.log(setLoading);
    }
    fetchData();

    console.log('is logged -> ', isLogged);

    // localStorage.isLogged = null;
    // setIsLogged('false');

    console.log('LOGGED OUT FROM REACT APP!');
  }, [isLogged, loading]);

  const handleLogOut = () => {
    console.log('handling logout');
    localStorage.isLogged = null;
    setIsLogged(false);
    window.location.reload();
  };

  const redirectHome = () => {
    console.log('redirect home!');
  }

  if (localStorage.isLogged === 'true') {
    return (
      <div className={classes.root}>
        <h1>are you sure you want to log out?</h1>
        <Button color="primary" variant="outlined" onClick={handleLogOut}>
          Yes, log out
        </Button>
  
        <Button color="secondary" variant="outlined" onClick={redirectHome}>
          No, keep logged in
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <h1>you're logged out!</h1>
    </div>
  );
  
}

export default LoggedOut;
