import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles()((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  button: {
    marginRight: '10px',
  },
  loaderWrapper: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export function LinkBtn(props) {
  const { classes } = useStyles();
  return (
    <Button
      className={classes.button}
      variant={props.variant}
      color={props.color}
    >
      <Link viewTransition className={classes.link} to={props.to}>
        {props.name}
      </Link>
    </Button>
  );
}

export function Loader(props) {
  const { classes } = useStyles();
  return (
    <div className={classes.loaderWrapper}>
      <CircularProgress />
    </div>
  );
}
