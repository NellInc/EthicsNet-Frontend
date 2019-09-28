import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { useStyles } from './style';

function HowToUse(props) {
  const classes = useStyles();

  const webStoreLink =
    'https://chrome.google.com/webstore/detail/djamiamgnjcpjhkknjddilkaibbhmhgc/';

  const extensionLink = 'http://extension.lupuselit.me/#/register';

  return (
    <Fragment>
      <Typography variant='h4' className={classes.title}>
        EthicsNet extension
      </Typography>

      <Typography className={classes.subtitle} variant='subtitle1'>
        Welcome to the EthicsNet extension - here there are a few tips on how to
        use the extension to annotate text, images and videos from the web!
      </Typography>

      <Typography variant='h5' className={classes.title}>
        First Steps
      </Typography>

      <Typography className={classes.steps} variant='body1'>
        <span className={classes.numbers}>1 - </span>Download the chome
        extension from the{' '}
        <Link
          href={webStoreLink}
          target='_blank'
          rel='noreferrer'
          className={classes.link}
        >
          chrome web store
        </Link>
        .
      </Typography>

      <Typography className={classes.steps} variant='body1'>
        <span className={classes.numbers}>2 - </span>Create an account on{' '}
        <Link
          href={extensionLink}
          target='_blank'
          rel='noreferrer'
          className={classes.link}
        >
          the EthicsNet website.
        </Link>
      </Typography>
    </Fragment>
  );
}

export default HowToUse;
