import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
// import html2canvas from 'html2canvas';

import { IsLogged } from '../Store';
import { useStyles } from './style';

function LoggedOut(props) {
  const classes = useStyles();
  const setIsLogged = useContext(IsLogged)[1];

  function handleLogOut() {
    // localStorage.isLogged = null;
    localStorage.clear();
    setIsLogged(false);
    // props.history.push('/');
    window.location.reload();
  };

  function redirectHome() {
    props.history.push('/')
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
