import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { VideoInfoContext } from '../Store';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';

function SaveVideo(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    start: '00:05',
    end: '01:00',
    category: 'morally preferable',
  });

  const [videoInfo, setVideoInfo] = useContext(VideoInfoContext);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const fetchData = async () => {
    try {
      const { token } = localStorage;

      const response = await fetch(`${apiURL}/api2/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        function youtube_parser(url) {
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
          var match = url.match(regExp);
          return match && match[7].length === 11 ? match[7] : false;
        }

        const url =
          'https://www.youtube.com/embed/' +
          youtube_parser(data.user.cachedVideo);

        setVideoUrl(url);
      }
    } catch (error) {
      console.error('there was an error -> ', error);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('state has changed!');
    console.log('====================================');
    console.log(videoInfo);
    console.log('====================================');
  }, [videoInfo]);

  // function handleSubmit(e) {
  //   e.preventDefault();

  // }

  async function handleSubmit(e) {
    e.preventDefault();
    setVideoInfo({ ...values, videoUrl });
    setLoading(true);
    const { title, description, category, start, end } = values;
    const { token, userId } = localStorage;

    const data = {
      category,
      title,
      description,
      videoUrl,
      videoStart: start,
      videoEnd: end,
      authorId: userId,
    };

    try {
      const response = await fetch(`${apiURL}/api/video`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
      });

      const json = await response.json();

      // TODO: Add notification with the response
      // console.log(json);
      console.log('====================================');
      console.log('Video saved -> ', json.videoCreated._id);
      const { _id } = json.videoCreated;

      localStorage.selectVideoId = _id;

      // console.log('====================================');
      // console.log('Video id -> ', _id);
      // console.log('====================================');
      // console.log('====================================');
      // setVideoInfo({ ...values, videoUrl, _id });

      // props.history.push('/user/videos'); // just for deployment
      props.history.push('/save-video-action');
    } catch (error) {
      console.error(error);
    }
  }

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
        frameBorder='0'
        width='100%'
        height='500px'
        allowFullScreen
      ></iframe>
      {/* <video
        tabIndex='-1'
        className='video-stream html5-main-video'
        controlsList='nodownload'
        style={{ width: '826px', height: '465px', left: '0px', top: '0px' }}
        src='blob:https://www.youtube.com/21c81753-6f95-47f5-8440-e160b237e9fa'
      ></video> */}

      <form
        className={classes.container}
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <TextField
          id='standard-name'
          label='Video title'
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin='normal'
          required
        />

        <TextField
          id='time'
          label='Video start'
          type='time'
          value={values.start}
          onChange={handleChange('start')}
          className={classes.time}
          required
        />

        <TextField
          id='time'
          label='Video end'
          type='time'
          value={values.end}
          onChange={handleChange('end')}
          className={classes.time}
          required
        />

        <TextField
          id='standard-multiline-static'
          label='Video description'
          multiline
          rows='4'
          value={values.description}
          className={classes.textField}
          onChange={handleChange('description')}
          margin='normal'
          required
        />

        <FormControl className={classes.textField}>
          <InputLabel htmlFor='category-simple'>Category</InputLabel>
          <Select
            required
            value={values.category}
            onChange={handleChange('category')}
            inputProps={{
              name: 'category',
              id: 'category-simple',
            }}
          >
            <MenuItem selected value='morally preferable'>
              Morally preferable
            </MenuItem>
            <MenuItem value='morally unpreferable'>
              Morally unpreferable
            </MenuItem>
            <MenuItem value='aesthetically preferable'>
              Aesthetically preferable
            </MenuItem>
            <MenuItem value='aesthetically unpreferable'>
              Aesthetically unpreferable
            </MenuItem>
            <MenuItem value='not unethical, but strange'>
              Not unethical, but strange
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          type='submit'
          color='primary'
          variant='outlined'
          className={classes.button}
        >
          Save Video
        </Button>
      </form>
    </div>
  );
}

export default SaveVideo;