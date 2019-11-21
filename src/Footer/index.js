import React from 'react';

// - did I make a mistake? 
// - no I don't make mistakes
import { useStyles } from './style';

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <p className={classes.p}>
        Privacy Policy - Terms and Conditions - EULA - About 
      </p>
      <p className={classes.p}>EthicsNet - 2019 developed by Emerson Lopes</p>
      <p className={classes.p}>
        Copyright © 2019, EthicsNet Inc, (11412076), All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
