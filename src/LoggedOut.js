import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
}));

function LoggedOut(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      console.log(setLoading);
    }

    console.log('log the user out here');
    

    fetchData()
  }, [loading])

  return (
    <div className={classes.root}>
      <h1>you're logged out!</h1>
    </div>
  );
}

export default LoggedOut;
