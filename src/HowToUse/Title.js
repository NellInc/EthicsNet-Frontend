import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './style';

export default function Title(props) {
  const classes = useStyles();
  const { title, subtitle } = props;

  return (
    <Fragment>
      <hr className={classes.hr} />

      <Typography variant='h5' className={classes.title}>
        {title}
      </Typography>

      <Typography className={classes.subtitle} variant='subtitle1'>
        {subtitle}
      </Typography>
    </Fragment>
  );
}
