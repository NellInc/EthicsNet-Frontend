import React, { useState, useEffect } from 'react';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';

function Videos(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  async function getVideoData() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiURL}/api/user/videos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log('videos fetched -> ', data.videos);

    setVideos(data.videos);
    setLoading(false);
  }

  useEffect(() => {
    getVideoData()
  }, [])

  if (loading) {
    return <Loader />
  }

  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length===11)? match[7] : false;
  } 

  const videoElements = videos.map(el => (
    <div key={el._id}>
      <iframe 
        title={el._id}
        src={'https://www.youtube.com/embed/' + youtube_parser(el.videoUrl)}
        width="100%"
        height="500px"
        frameBorder="0"
        allowFullScreen
      >
      </iframe>

      <h3>{el.title}</h3>
      <p><span className={classes.category}>{el.category}</span></p>
      <p>Url: <a href={el.videoUrl} target="_blank" rel="noopener noreferrer">
        {el.videoUrl}
      </a></p>
      <p>Start: {el.videoStart} </p>
      <p>End: {el.videoEnd}</p>
      <p>Description: {el.description ? el.description : 'no description provided'}</p>

      <hr className={classes.hr} />
    </div>
  ))

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>All videos</h3>
      {videoElements}
    </div>
  );
}

export default Videos;
