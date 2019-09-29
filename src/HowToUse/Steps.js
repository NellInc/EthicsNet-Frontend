import React from 'react';

import { useStyles } from './style';

export default function Steps(props) {
  const classes = useStyles();

  const { img, children } = props;
  return (
    <div className={classes.stepsComponent}>
      {children}
      <img className={classes.stepsImage} src={img} alt='' srcSet='' />
    </div>
  );
}
