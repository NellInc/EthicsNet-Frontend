import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';

function SaveImage(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');

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
    console.log('submit!!!');

    const { title, description, category } = values;
    const { token, userId, imageFont } = localStorage;

    const data = {
      title,
      description,
      category,
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

      const json = await response.json();

      console.log(json);

      props.history.push('/user/images');
    } catch (error) {
      console.log(error);
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

        <FormControl className={classes.textField}>
          <InputLabel htmlFor='category-simple'>Category</InputLabel>
          <Select
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
          </Select>
        </FormControl>

        <Button className={classes.submit} type='submit' variant='outlined'>
          Save
        </Button>
      </form>
    </div>
  );
}

export default SaveImage;
