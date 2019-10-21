// This component is a placeholder for the chrome extension to
// take a screenshot of the youtube video

import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { VideoInfoContext } from '../Store';

import { useStyles } from './style';
// import { apiURL } from '../globals';
import { Loader } from '../components';

function SaveVideoAction(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [videoInfo] = useContext(VideoInfoContext);
  const [timedVideo, setTimeVideo] = useState('');

  useEffect(() => {
    setLoading(false);

    console.log('videoinfo -> ', videoInfo);

    console.log(videoInfo.start);
    console.log(videoInfo.start[0]);
    console.log(videoInfo.start[1]);
    console.log(videoInfo.start[2]);
    console.log(videoInfo.start[3]);
    console.log(videoInfo.start[4]);

    const { end, start, videoUrl } = videoInfo;

    const minutesStart = start[0] * 10 + start[1] * 1;

    const secondStart = start[3] * 10 + start[4] * 1 + minutesStart * 60;

    const minutesEnd = end[0] * 10 + end[1] * 1;
    const secondEnd = end[3] * 10 + end[4] * 1 + minutesEnd * 60;

    setTimeVideo(
      `${videoUrl}?start=${secondStart}&end=${secondEnd}&autoplay=1`
    );

    console.log('====================================');
    console.log(
      secondStart,
      secondEnd,
      videoUrl + `?start=${secondStart}&end=${secondEnd}&autoplay=1`
    );
    console.log('====================================');
  }, [videoInfo]);

  function handleSelectPersonClick() {
    setLoading(true)
    setTimeout(() => {
      console.log('====================================');
      console.log('handle person click!');
      console.log('====================================');
      props.history.push('/select-person-action')
    }, 3000);
  }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setLoading(true);
  //   const { title, description, category, start, end } = values;
  //   const { token, userId } = localStorage;

  //   const data = {
  //     category,
  //     title,
  //     description,
  //     videoUrl,
  //     videoStart: start,
  //     videoEnd: end,
  //     authorId: userId,
  //   };

  //   try {
  //     const response = await fetch(`${apiURL}/api/video`, {
  //       method: 'POST',
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       credentials: 'same-origin',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       redirect: 'follow',
  //       referrer: 'no-referrer',
  //       body: JSON.stringify(data),
  //     });

  //     const json = await response.json();

  //     // TODO: Add notification with the response
  //     console.log(json);

  //     props.history.push('/user/videos');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  if (loading) {
    return <Loader />;
  }

  if (videoInfo.videoUrl) {
    const { videoUrl } = videoInfo;
    return (
      <div className={classes.root}>
        <Typography variant='h4' className={classes.title}>
          Save video
        </Typography>

        <iframe
          title={videoUrl}
          src={timedVideo}
          frameBorder='0'
          width='100%'
          height='500px'
          allowFullScreen
        ></iframe>

        <hr className={classes.hr} />

        <div>
          <Typography variant='body1' gutterBottom>
            Play the video then pause when you want to save the person who's
            doing the action
          </Typography>
          <Typography variant='body1' gutterBottom>
            When you see the person clearly, hit the 'Select person' button.
          </Typography>
        </div>

        {/* when the user clicks this button I want to send a message to the chrome extension */}
        <Button onClick={handleSelectPersonClick} data-extension-person color='primary' variant='outlined'>
          Select person
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p>ops... there was an error processing your request</p>
    </div>
  );
}

export default SaveVideoAction;
