import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { useStyles } from './style';

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant='h5' gutterBottom>
        EthicsNet
      </Typography>
      <Typography variant='body1' gutterBottom>
        Welcome to EthicsNet, now you can start to anotate things on the web.
      </Typography>
      <Button
        color='primary'
        variant='outlined'
        style={{ marginRight: '10px' }}
      >
        <Link className={classes.link} to='/profile/annotations'>
          Annotations
        </Link>
      </Button>
      <Button
        color='primary'
        variant='outlined'
        style={{ marginRight: '10px' }}
      >
        <Link className={classes.link} to='/user/images'>
          Images
        </Link>
      </Button>

      <Button
        color='primary'
        variant='outlined'
        style={{ marginRight: '10px' }}
      >
        <Link className={classes.link} to='/user/videos'>
          Videos
        </Link>
      </Button>
      <Button
        color='primary'
        variant='outlined'
        style={{ marginRight: '10px' }}
      >
        <Link className={classes.link} to='/annotations/new'>
          Insert new text annotation
        </Link>
      </Button>
      <Button
        color='primary'
        variant='outlined'
        style={{ marginRight: '10px' }}
      >
        <Link className={classes.link} to='/profile'>
          Profile
        </Link>
      </Button>

      <Button
        color='primary'
        variant='outlined'
        style={{ marginRight: '10px', marginTop: 10 }}
      >
        <Link className={classes.link} to='/how-to-use'>
          How to use it
        </Link>
      </Button>
    </div>
  );
}

export default Home;
