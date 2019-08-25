import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { useStyles } from './style';

function Home() {
  const classes = useStyles();
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
        <Link className={classes.link} to="/profile/annotations">
          Annotations
        </Link>
      </Button>
      <Button
        color="primary"
        variant="outlined"
        style={{ marginRight: '10px' }}
      >
        <Link className={classes.link} to="/annotations/new">
          Insert new annotation
        </Link>
      </Button>
      <Button
        color="primary"
        variant="outlined"
        style={{ marginRight: '10px' }}
      >
        <Link className={classes.link} to="/profile">
          Profile
        </Link>
      </Button>
    </div>
  );
}

export default Home;
