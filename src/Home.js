import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    color: 'rgb(50, 50, 50)',
  },
  title: {
    color: 'rgba(196, 196, 196)',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

function Home(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {}

    fetchData();
  }, [loading]);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h5" gutterBottom>
        Ethics Net
      </Typography>

      <Typography variant="body1" gutterBottom>
        Welcome to Ethics Net, now you can start to anotate things on the web.
      </Typography>

      <Button
        color="primary"
        variant="outlined"
        style={{ marginRight: '10px' }}
      >
        <Link className={classes.link} to="/profile/anotations">
          Anotations
        </Link>
      </Button>

      <Button color="primary" variant="outlined">
        <Link className={classes.link} to="/profile">
          Profile
        </Link>
      </Button>
    </div>
  );
}

export default Home;
