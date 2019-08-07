import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
}));

function Anotation(props) {
  const classes = useStyles();

  // localStorage.userName = "rdegges";
  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {

      console.log('first data');
      
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
