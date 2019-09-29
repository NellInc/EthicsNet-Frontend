import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Steps from './Steps';
import { useStyles } from './style';

import text1 from '../assets/images/text1.png';
import text2 from '../assets/images/text2.png';
import text3 from '../assets/images/text3.png';

import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';

import video1 from '../assets/images/video1.png';
import video2 from '../assets/images/video2.png';
import video3 from '../assets/images/video3.png';
import video4 from '../assets/images/video4.png';

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

      <hr className={classes.hr} />

      <Typography variant='h5' className={classes.title}>
        Annotating text
      </Typography>

      <Typography className={classes.subtitle} variant='subtitle1'>
        While you are browsing the web, once you have the EthicsNet extension
        installed you can annotate text from any website.
      </Typography>

      <Steps img={text1}>
        <span className={classes.numbers}>1 - </span>Select the text, you'll see
        a yellow button, click it to open the sidebar.
      </Steps>

      <Steps img={text2}>
        <span className={classes.numbers}>2 - </span>The sidebar will open on
        the right, you can now edit the text if you'd like, select a category
        and save the text annotation.
      </Steps>

      <Steps img={text3}>
        <span className={classes.numbers}>2 - </span>It's done! Now you can make
        another annotation or check all annotation on the EthicsNet website.
      </Steps>

      <hr className={classes.hr} />

      <Typography variant='h5' className={classes.title}>
        Annotating images
      </Typography>

      <Typography className={classes.subtitle} variant='subtitle1'>
        Image annotations work a little bit differently from text annotation, it
        first takes a screenshot of the current webpage you want to annotate,
        then you'll see a screen to crop the image and add more details. Follow
        these steps:
      </Typography>

      <Steps img={image1}>
        <span className={classes.numbers}>1 - </span>Open the page you want to
        annotate an image from and right click it, it will open a menu.
      </Steps>

      <Steps img={image2}>
        <span className={classes.numbers}>2 - </span>Click on the select area
        button, it will open a new window, so you can select the area you want
        to annotate. Select the area and then hit 'save image'.
      </Steps>

      <Steps img={image3}>
        <span className={classes.numbers}>3 - </span>Finally, you can review the
        selected area, add a title, description and category. When everything is
        ready to go, hit save and that's it! You just annotated an image!
      </Steps>

      <hr className={classes.hr} />

      <Typography variant='h5' className={classes.title}>
        Annotating videos
      </Typography>

      <Typography className={classes.subtitle} variant='subtitle1'>
        Currently we only support annotating videos from youtube. It works like
        this:
      </Typography>

      <Steps img={video1}>
        <span className={classes.numbers}>1 - </span>Open the youtube video you
        want to annotate.
      </Steps>

      <Steps img={video2}>
        <span className={classes.numbers}>2 - </span>Click the EthicsNet extension button on the top right of chrome, then click on the 'Annotate video' button.
      </Steps>

      <Steps img={video3}>
        <span className={classes.numbers}>3 - </span>The input will already be with the current video url, change it if you need it, then click on 'save'. It will open a new window.
      </Steps>
      <Steps img={video4}>
        <span className={classes.numbers}>4 - </span>Now you just need to add when the action happens, when it ends, a title, description and category, click on 'save video' and there you go! You have just annotated a video action with the EthicsNet extension.
      </Steps>

      <hr className={classes.hr} />

      <Typography variant='h5' className={classes.title}>
        Next steps
      </Typography>

      <Typography className={classes.subtitle} variant='subtitle1'>
        Now you know to use the EthicsNet extension
      </Typography>
    </Fragment>
  );
}

export default HowToUse;
