import React from 'react';

import { useStyles } from './style';

function Annotation(props) {
  const classes = useStyles();

  return <div className={classes.root}>annotation</div>;
}

export default Annotation;
