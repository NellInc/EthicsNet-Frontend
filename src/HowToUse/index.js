import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Title from './Title';
import { useStyles } from './style';
import { textSteps, imageSteps, videoSteps } from './data';

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
        First steps
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

      <Title
        title='Annotating text'
        subtitle='While you are browsing the web, once you have the EthicsNet extension
        installed you can annotate text from any website.'
      />

      {textSteps}

      <Title
        title='Annotating images'
        subtitle='Image annotations work a little bit differently from text annotation, it
        first takes a screenshot of the current webpage you want to annotate,
        then you will see a screen to crop the image and add more details. Follow
        these steps:'
      />

      {imageSteps}

      <Title
        title='Annotating videos'
        subtitle='Currently we only support annotating videos from youtube. It works like this:'
      />

      {videoSteps}

      <Title
        title='Next steps'
        subtitle='Now you know how to use the EthicsNet extension'
      />
    </Fragment>
  );
}

export default HowToUse;
