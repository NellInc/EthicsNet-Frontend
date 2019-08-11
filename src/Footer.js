import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => (
  {
 
  footer: {
    border: '1px solid #000',
    textAlign: 'center',
    // position: 'absolute',
    width: '100%',
    bottom: '1px',
    color: '#fff',
    background: theme.palette.primary.main
  },
  p: {
    margin: '2px'
  }
}));

function Footer(props) {
  const classes = useStyles();

  // localStorage.userName = "rdegges";
  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {

      console.log('first data');
      
    }

    fetchData()

    setLoading(false)
  }, [loading])
  

  return (
    <div className={classes.footer}>
      <p className={classes.p}>ethics eth - 2019</p>
    </div>
  );
}

export default Footer;
