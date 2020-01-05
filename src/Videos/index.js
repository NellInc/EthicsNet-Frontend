import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Pagination from '../Components/Pagination';
import { useStyles } from './style';
import { Loader } from '../components';
import { Notification } from '../Store';
import API from '../globals';

import Video from './Video';

function Videos(props) {
  const classes = useStyles();

  const notification = useContext(Notification);

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getVideoData() {
      try {
        const { data } = await API.get('/api2/video/' + page);
        setVideos(data.videos);
        setCount(data.count);
        setLoading(false);
      } catch (error) {
        notification(error.message, 'Error', 'danger');
      }
    }

    getVideoData();
  }, [page, loading, notification]);

  async function deleteVideo(id) {
    setLoading(true);
    try {
      await API.delete('/api2/video/' + id);
    } catch (error) {
      notification(error.message, 'Error', 'danger');
    } finally {
      setLoading(false);
    }
  }

  async function editVideo(id, newData) {
    // setLoading(true);
    try {
      await API.put('/api2/video/edit/' + id, newData);
      const { data } = await API.get('/api2/video/' + page);
      setVideos(data.videos);
      setCount(data.count);
      setLoading(false);
    } catch (error) {
      notification(error.message, 'Error', 'danger');
    } finally {
      setLoading(false);
    }
  }

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  const videoElements = videos.map(el => (
    <Video
      key={el._id}
      youtube_parser={youtube_parser}
      el={el}
      deleteVideo={deleteVideo}
      editVideo={editVideo}
    />
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
