import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useStyles } from './style';
import { apiURL } from '../globals';

function SaveImage(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');

  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    setImage(localStorage.img);
    setLoading(false);
  }, [loading]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('submit!!!');

    const { title, description } = values;
    const { token, userId, imageFont } = localStorage;
    

    const data = {
      title,
      description,
      image,
      imageFont,
      authorId: userId
    }

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

  return (
    <div className={classes.root}>

      <Typography className={classes.typography} variant="h5" gutterBottom>
        Save Image
      </Typography>
      <img className={classes.img} src={image} alt="" />
      <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
        <TextField
          id="title"
          label="Title"
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin="normal"
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows="4"
          className={classes.textField}
          value={values.description}
          onChange={handleChange('description')}
          margin="normal"
        />

        <Button type="submit" variant="outlined">Save</Button>
      </form>
    </div>
  );
}

export default SaveImage;
