import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './style';

function Landing(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h4' gutterBottom>
        About Us
      </Typography>

      <Typography variant='body1' gutterBottom>
        EthicsNet is building a community, one with the purpose of experimenting
        with different potential techniques to create datasets – examples of
        nice behaviours (such as social norms), to help socialise A.I.
      </Typography>

      <br />

      <Typography variant='body1' gutterBottom>
        Machine intelligences will simply amplify and return whatever data we
        give them. Our goal is to advance the field of machine ethics, by
        seeding technology that makes it easy to teach machines about ones
        individual and cultural behavioral preferences.
      </Typography>

      <br />

      <Typography variant='subtitle1' gutterBottom>
        Download the extension from the Chrome Web Store and start annotation
        text from the web right now!
      </Typography>

      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://chrome.google.com/webstore/detail/ethics-net/djamiamgnjcpjhkknjddilkaibbhmhgc'
      >
        Ehtics Net extension
      </a>
    </div>
  );
}

export default Landing;
