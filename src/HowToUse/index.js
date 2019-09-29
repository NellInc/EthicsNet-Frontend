import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Steps from './Steps';
import Title from './Title';
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
  const txt = {
    0: text1,
    1: text2,
    2: text3,
  };

  const img = {
    0: image1,
    1: image2,
    2: image3,
  };

  const vi = {
    0: video1,
    1: video2,
    2: video3,
    3: video4,
  };

  const classes = useStyles();

  const webStoreLink =
    'https://chrome.google.com/webstore/detail/djamiamgnjcpjhkknjddilkaibbhmhgc/';

  const extensionLink = 'http://extension.lupuselit.me/#/register';

  const textTitles = [
    `Select the text, you'll see a yellow button, click it to open the sidebar.`,
    `The sidebar will open on the right, you can now edit the text if you'd like, select a category and save the text annotation.`,
    `It's done! Now you can make another annotation or check all annotation on the EthicsNet website.`,
  ];

  const imageTitles = [
    `Open the page you want to annotate an image from and right click it, it will open a menu.`,
    `Click on the select area button, it will open a new window, so you can select the area you want to annotate. Select the area and then hit 'save image'.`,
    `Finally, you can review the
    selected area, add a title, description and category. When everything is
    ready to go, hit save and that's it! You just annotated an image!`,
  ];

  const videoTitles = [
    `Open the youtube video you want to annotate.`,
    `Click the EthicsNet extension button on the top right of chrome, then click on the 'Annotate video' button.`,
    `he input will already be with the current video url, change it if you need it, then click on 'save'. It will open a new window.`,
    `Now you just need to add when the action happens, when it ends, a title, description and category, click on 'save video' and there you go! You have just annotated a video action with the EthicsNet extension.`,
  ];

  const textSteps = textTitles.map((text, index) => (
    <Steps key={index} img={txt[index]}>
      <span className={classes.numbers}>{index + 1} - </span>
      {text}
    </Steps>
  ));

  const imageSteps = imageTitles.map((image, index) => (
    <Steps key={index} img={img[index]}>
      <span className={classes.numbers}>{index + 1} - </span>
      {image}
    </Steps>
  ));

  const videoSteps = videoTitles.map((video, index) => (
    <Steps key={index} img={vi[index]}>
      <span className={classes.numbers}>{index + 1} - </span>
      {video}
    </Steps>
  ));

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
