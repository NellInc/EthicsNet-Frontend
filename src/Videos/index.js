import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Pagination from '../Components/Pagination';
import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';

import Video from './Video';

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

      setVideos(data.videos);
      setCount(data.count);
      setLoading(false);
    }

    getVideoData();
  }, [page]);

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  const videoElements = videos.map(el => (
    <Video key={el._id} youtube_parser={youtube_parser} el={el} />
  ));

  if (loading) {
    return <Loader />;
  }

  if (!videos.length) {
    return (
      <div style={{ textAlign: 'center' }}>
        you haven't annotated any video yet...
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{`EthicsNet - Videos - ${page}`}</title>
      </Helmet>
      <h3 className={classes.title}>All videos</h3>

      {videoElements}

      <Pagination
        setPage={setPage}
        setLoading={setLoading}
        count={count}
        page={page}
      />
    </div>
  );
}

export default Videos;
