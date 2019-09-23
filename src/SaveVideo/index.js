import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputMask from 'react-input-mask';

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
    start: '',
    end: '',
    category: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const fetchData = async () => {
    try {
      const { token } = localStorage;

      const response = await fetch(`${apiURL}/api/user`, {
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

        const url = 'https://www.youtube.com/embed/' + youtube_parser(data.user.cachedVideo)

        setVideoUrl(url)
      }
    } catch (error) {
      console.log('there was an error -> ', error);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    console.log('submit video form!');

    const { 
      title,
      description,
      category,
      start,
      end
     } = values;
    const { token, userId, imageFont } = localStorage;
    

    const data = {
      category,
      title,
      description,
      videoUrl,
      videoStart: start,
      videoEnd: end,
      authorId: userId,
    }

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

      console.log(json);

      props.history.push('/user/videos');
      
    } catch (error) {
      console.log(error);
    }
    
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

        <FormControl className={classes.textField}>
          <InputLabel htmlFor="category-simple">Category</InputLabel>
          <Select
            required
            value={values.category}
            onChange={handleChange('category')}
            inputProps={{
              name: 'category',
              id: 'category-simple',
            }}
          >
            <MenuItem selected value="morally preferable">
              Morally preferable
            </MenuItem>
            <MenuItem value="morally unpreferable">Morally unpreferable</MenuItem>
            <MenuItem value="aesthetically preferable">Aesthetically preferable</MenuItem>
            <MenuItem value="aesthetically unpreferable">Aesthetically unpreferable</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={handleSubmit} color="primary" variant="outlined" className={classes.button}>
          Save Video
        </Button>
      </form>
    </div>
  );
}

export default SaveVideo;
