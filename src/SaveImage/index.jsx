import { useSoftNavigate } from '../hooks/useSoftNavigate';
import React, { useState, useEffect, useContext } from 'react';
import {  } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';
import { Notification } from '../Store';
import RangeSlider from '../Slider';

function SaveImage() {
  const { classes } = useStyles();
  const navigate = useSoftNavigate();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');
  const notification = useContext(Notification);

  const [contentAction, setContentAction] = useState(50);
  const [toneForm, setToneForm] = useState(50);

  const [values, setValues] = useState({
    title: '',
    description: '',
    category: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    setImage(localStorage.img);
    setLoading(false);
  }, []);

  async function handleSubmit(e) {
    setLoading(true);

    e.preventDefault();
    const { title, description, category } = values;
    const { token, userId, imageFont } = localStorage;

    const data = {
      title,
      description,
      category,
      contentAction,
      toneForm,
      image,
      imageFont,
      authorId: userId,
    };

    try {
      const response = await fetch(`${apiURL}/api/image`, {
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

      if (response.status === 200) {
        notification('Image saved');
      } else {
        notification('there was a problem saving the image');
      }
      navigate('/user/images');
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.typography} variant='h5' gutterBottom>
        Save Image
      </Typography>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={image} alt='' />
      </div>
      <form
        onSubmit={handleSubmit}
        className={classes.container}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='title'
          label='Title'
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin='normal'
        />
        <TextField
          id='description'
          label='Description'
          multiline
          rows='4'
          className={classes.textField}
          value={values.description}
          onChange={handleChange('description')}
          margin='normal'
        />

        <RangeSlider
          range={contentAction}
          setValue={setContentAction}
          name='Content/Action'
        />

        <RangeSlider range={toneForm} setValue={setToneForm} name='Tone/Form' />

        <Button className={classes.submit} type='submit' variant='outlined'>
          Save
        </Button>
      </form>
    </div>
  );
}

export default SaveImage;
