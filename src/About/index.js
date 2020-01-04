import React from 'react';

import { useStyles } from './style';

function About() {
  const classes = useStyles();
  return (
    <div className={classes.about}>
      <div>
        <p>EthicsNet Annotation Extension – Chrome Version </p>
        <p>Version 0.1.42-alpha (Release 51)</p>
        <p>Copyright © 2019, EthicsNet Inc, (11412076), All rights reserved.</p>
      </div>
      <p className={classes.p}>
        Developed by{' '}
        <a href='http://lupuselit.me' target='_blank' rel='noopener noreferrer'>
          Emerson Lopes
        </a>
      </p>
    </div>
  );
}

export default About;
