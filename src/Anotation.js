import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
}));

function Anotation(props) {

  console.log('LOCAL STORAGEEE -> ', localStorage.isLogged);

  const classes = useStyles();

  const [anotation, setAnotation] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {

      const { isLogged } = localStorage;

      console.log('first data', isLogged);
      
    }

    fetchData()
  }, [loading])
  
  const userId = props.match.params.id;
  console.log(userId);

  return (
    <div>
      <h1>anotation</h1>
    </div>
  );
}

export default Anotation;
