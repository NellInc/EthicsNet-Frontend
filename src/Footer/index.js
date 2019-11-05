import React from 'react';

import { useStyles } from './style'

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <p className={classes.p}>EthicsNet - 2019</p>
    </div>
  );
}

export default Footer;
