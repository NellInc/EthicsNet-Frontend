import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  button: {
    marginRight: '10px'
  }
}));

export function LinkBtn(props) {
  const classes = useStyles();
  return (
    <Button className={classes.button} variant={props.variant} color={props.color}>
      <Link className={classes.link} to={props.to}>
        {props.name}
      </Link>
    </Button>
  )
}