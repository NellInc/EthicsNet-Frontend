import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputMask from 'react-input-mask';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';

function SaveVideo(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(
    'https://www.youtube.com/embed/keWi0PAodhw'
  );

  const [videos, setVideos] = useState([]);

  const [values, setValues] = React.useState({
    title: '',
    description: '',
    start: '',
    end: '',
  });

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

  function changeUrl() {
    function youtube_parser(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      return match && match[7].length === 11 ? match[7] : false;
    }
    setVideoUrl('https://www.youtube.com/embed/' + youtube_parser(videoUrl));
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    getVideoData();
    changeUrl();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Save video</h3>

      <iframe
        title={videoUrl}
        src={videoUrl}
        // src="https://www.youtube.com/embed/keWi0PAodhw"
        frameBorder="0"
        width="100%"
        height="500px"
        allowFullScreen
      ></iframe>

      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Video title"
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin="normal"
        />

        <InputMask
          mask="99:99"
          value={values.start}
          onChange={handleChange('start')}
          className={classes.time}
        >
          {() => (
            <TextField
              label="Video start"
              className={classes.time}
              margin="normal"
              type="text"
            />
          )}
        </InputMask>

        <InputMask
          mask="99:99"
          value={values.end}
          onChange={handleChange('end')}
          className={classes.time}
        >
          {() => (
            <TextField
              label="Video end"
              className={classes.time}
              margin="normal"
              type="text"
            />
          )}
        </InputMask>

        <TextField
          id="standard-multiline-static"
          label="Video description"
          multiline
          rows="4"
          value={values.description}
          className={classes.textField}
          onChange={handleChange('description')}
          margin="normal"
        />
      </form>
    </div>
  );
}

export default SaveVideo;
