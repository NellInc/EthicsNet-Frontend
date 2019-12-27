import React from 'react';
// nunca perca dinheiro
// todo sucesso da noite pro dia, tbm some do dia pra noite
// somos livres na escolha mas escravos na consequencia

import { useStyles } from './style';
import Category from '../Components/Category';
import DeleteVideo from './DeleteVideo';
import EditVideo from './EditVideo';

function Video({ el, youtube_parser, deleteVideo, editVideo }) {
  const classes = useStyles();
  const {
    _id,
    title,
    videoUrl,
    // category,
    videoStart,
    videoEnd,
    description,
    selectedPerson,
    contentAction,
    toneForm,
  } = el;

  return (
    <div key={_id} className={classes.video}>
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

      <p>Person doing the action: </p>
      <img src={selectedPerson} alt='' srcSet='' />

      <hr className={classes.hr} />

      <Category
        title='Content/Action'
        categoryRangeContentAction={contentAction}
      />

      <Category title='Tone/Form' categoryRangeContentAction={toneForm} />

      <hr className={classes.hr} />

      {/* <Button variant='outlined' color='secondary'>
        Delete
      </Button> */}

      <div className={classes.buttons}>
        <DeleteVideo
          title={title}
          id={_id}
          // video={video}
          deleteVideo={deleteVideo}
        />

        <EditVideo
          title={title}
          id={_id}
          contentAction={contentAction}
          toneForm={toneForm}
          editVideo={editVideo}
          description={description}
        />
      </div>
    </div>
  );
}

export default Video;
