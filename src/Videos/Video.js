import React from 'react';

import { useStyles } from './style';

function Video({ el, youtube_parser }) {
  const classes = useStyles();
  const {
    _id,
    title,
    videoUrl,
    category,
    videoStart,
    videoEnd,
    description,
    selectedPerson,
  } = el;

  return (
    <div key={_id}>
      <iframe
        title={_id}
        src={
          'https://www.youtube.com/embed/' +
          youtube_parser(videoUrl) +
          '?start=11&end=1&autoplay=1'
        }
        width='100%'
        height='500px'
        frameBorder='0'
        allowFullScreen
      ></iframe>

      <h3>{title}</h3>
      <p>
        <span className={classes.category}>{category}</span>
      </p>

      <p>Person doing the action: </p>
      <img src={selectedPerson} alt='' srcSet='' />

      <p>
        Url:{' '}
        <a href={videoUrl} target='_blank' rel='noopener noreferrer'>
          {videoUrl}
        </a>
      </p>
      <p>Start: {videoStart} </p>
      <p>End: {videoEnd}</p>
      <p>
        Description: {description ? description : 'no description provided'}
      </p>

      <hr className={classes.hr} />
    </div>
  );
}

export default Video;
