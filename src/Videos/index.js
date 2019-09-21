import React, { useState, useEffect } from 'react';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';

function Videos(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  async function getVideoData() {
    console.log('get video data called!');
    
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

  console.log(youtube_parser('https://www.youtube.com/embed/NC9YGuDcjrE'));
  

  const videoElements = videos.map(el => (
    <div key={el._id}>
      <h5>Video url: {el.videoUrl.slice(0,24) + 'embed' + el.videoUrl.slice(23)}</h5>

      <iframe 
        title={el._id}
        src={'https://www.youtube.com/embed/' + youtube_parser(el.videoUrl)}
        width="100%"
        height="500px"
        frameBorder="0"
        allowFullScreen
      >
      </iframe>

      <p>Video start: {el.videoStart}</p>
      <p>Video end: {el.videoEnd}</p>
      <p>Description: {el.description}</p>

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
