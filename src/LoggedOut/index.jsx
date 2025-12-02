import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { IsLogged } from '../Store';
import { useStyles } from './style';

function LoggedOut() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const setIsLogged = useContext(IsLogged)[1];

  function handleLogOut() {
    localStorage.clear();
    setIsLogged(false);
    window.location.reload();
  }

  function redirectHome() {
    navigate('/');
  }

  if (localStorage.isLogged === 'true') {
    return (
      <div>
        <h1>are you sure you want to log out?</h1>
        <Button style={{marginRight: '10px'}} color="primary" variant="outlined" onClick={handleLogOut}>
          Yes, log out
        </Button>
        <Button color="secondary" variant="outlined" onClick={redirectHome}>
          No, keep logged in
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.loggedOut}>
      <h2 className={classes.title}>EthicsNet</h2>
    </div>
  );
  
}

export default LoggedOut;
