import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

import Pagination from '../Components/Pagination';
import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';
import { Notification } from '../Store';

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
  }, [page, loading]);

  async function deleteVideo(id) {
    setLoading(true);
    try {
      const { token } = localStorage;

      const response = await fetch(`${apiURL}/api2/video/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        notification('Video annotation deleted!');
        setVideos(videos.filter(el => el._id !== id));
      } else {
        notification(
          'There was a problem deleting the video annotation',
          '',
          'danger'
        );
      }
    } catch (error) {
      console.error(error);
      notification(
        'There was a problem deleting the video annotation',
        '',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  }

  async function editVideo(id, newData) {
    setLoading(true);
    try {
      const { token } = localStorage;

      const response = await fetch(`${apiURL}/api2/video/edit/${id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(newData)
      })

      if (response.status === 200) {
        notification('Video annotation updated');
      } else {
        notification(
          'There was a problem editing the video annotation',
          '',
          'danger'
        )
      }

    } catch (error) {
      console.log('error editing video -> ', error)
      notification(
        'There was a problem editing the video annotation',
        '',
        'danger'
      )
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
