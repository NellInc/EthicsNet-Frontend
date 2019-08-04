import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  // container: {
  //   maxWidth: '700px',
  //   margin: 'auto',
  //   border: '1px solid #000',
  //   padding: '30px',
  //   borderRadius: '5px',
  // },
}));

function Profile() {
  const classes = useStyles();

  useEffect(() => {
    // localStorage.setItem('name', 'emerson');
    // localStorage.setItem('isLogged', true);
  }, []);

  return (
    <div className={classes.container}>
      <header>
        <p>Ethics eth - you're loged in!</p>
      </header>

      <Link to="/register">register</Link>
      <br />
      <Link to="/login">login</Link>
    </div>
  );
}

export default Profile;
