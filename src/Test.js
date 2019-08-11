import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
}));

function Anotation(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      console.log(setLoading);
    }

    fetchData()
  }, [loading])

  return (
    <div className={classes.root}>
      <h1>anotation??</h1>
    </div>
  );
}

export default Anotation;
