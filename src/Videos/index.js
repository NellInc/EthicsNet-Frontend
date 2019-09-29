import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';

function Videos(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getVideoData() {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiURL}/api/user/videos/${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('====================================');
      console.log('videos -> ', data);
      console.log('====================================');

      setVideos(data.videos);
      setCount(data.count);
      setLoading(false);
    }

    getVideoData();
  }, [page]);

  function handleNextPage() {
    if (page * 5 < count) {
      setPage(page + 1);
      setLoading(true);
    }
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1);
      setLoading(true);
    }
  }

  if (loading) {
    return <Loader />;
  }

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  const videoElements = videos.map(el => (
    <div key={el._id}>
      <iframe
        title={el._id}
        src={'https://www.youtube.com/embed/' + youtube_parser(el.videoUrl)}
        width='100%'
        height='500px'
        frameBorder='0'
        allowFullScreen
      ></iframe>

      <h3>{el.title}</h3>
      <p>
        <span className={classes.category}>{el.category}</span>
      </p>
      <p>
        Url:{' '}
        <a href={el.videoUrl} target='_blank' rel='noopener noreferrer'>
          {el.videoUrl}
        </a>
      </p>
      <p>Start: {el.videoStart} </p>
      <p>End: {el.videoEnd}</p>
      <p>
        Description:{' '}
        {el.description ? el.description : 'no description provided'}
      </p>

      <hr className={classes.hr} />
    </div>
  ));

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>All videos</h3>
      {videoElements}

      <div className={classes.pagination}>
        <Button
          color='primary'
          variant='outlined'
          style={{ marginRight: '10px' }}
          onClick={handlePreviousPage}
        >
          Previous Page
        </Button>

        <span>{page}</span>

        <Button
          color='primary'
          variant='outlined'
          style={{ marginLeft: '10px' }}
          onClick={handleNextPage}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}

export default Videos;
