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
import UploadImage from './UploadImage';

function SaveImageUpload() {
  const { classes } = useStyles();
  const navigate = useSoftNavigate();

  const [loading, setLoading] = useState(true);
  const notification = useContext(Notification);

  const [contentAction, setContentAction] = useState(50);
  const [toneForm, setToneForm] = useState(50);

  const [values, setValues] = useState({
    title: '',
    description: '',
    category: '',
  });

  const [base64, setBase64] = useState('');

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function getImage(base64) {
    setBase64(base64);
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!base64) return alert('please upload an image!');
    setLoading(true);
    const { title, description, category } = values;
    const { token, userId, imageFont } = localStorage;

    const data = {
      title,
      description,
      category,
      contentAction,
      toneForm,
      image: base64,
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
        Upload Image
      </Typography>
      <div className={classes.imgWrapper}>
        {/* <img className={classes.img} src={image} alt='' /> */}
        <UploadImage getImage={getImage} />
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

export default SaveImageUpload;
