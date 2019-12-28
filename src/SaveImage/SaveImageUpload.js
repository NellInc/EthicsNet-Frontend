import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';
import { Notification } from '../Store';
import RangeSlider from '../Slider';
import UploadImage from './UploadImage';

function SaveImageUpload(props) {
  const classes = useStyles();

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
      props.history.push('/user/images');
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
