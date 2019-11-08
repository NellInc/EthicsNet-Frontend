import React from 'react';

import { useStyles } from './style';

function About() {
  const classes = useStyles();
  return (
    <div className={classes.about}>
      <div>
        <p>EthicsNet Annotation Extension – Chrome Version </p>
        {/* <p>[version/build number string, if that exists]</p> */}
        <p>Version 0.1.0-alpha (Release 44)</p>
        <p>Copyright © 2019, EthicsNet Inc, (11412076), All rights reserved.</p>
        {/* <p>
          (later a link to a license, once we figure out what to release it
          under)
        </p> */}
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
