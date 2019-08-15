import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { IsLogged } from './Store'

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
}));

function LoggedOut(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useContext(IsLogged)

  useEffect(() => {
    async function fetchData() {
      console.log(setLoading);
    }
    fetchData()

    localStorage.isLogged = null;
    setIsLogged('false');

    console.log('LOGGED OUT FROM REACT APP!');
    

  }, [loading])

  return (
    <div className={classes.root}>
      <h1>you're logged out!</h1>
    </div>
  );
}

export default LoggedOut;
