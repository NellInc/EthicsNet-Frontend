import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

import { apiURL } from '../globals';
import { Loader } from '../components';
import { Notification } from '../Store';
import { useStyles } from './style';

function NewAnotation(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [anotation, setAnotation] = useState('');
  const [category, setCategory] = useState(0);
  const notification = useContext(Notification);

  const handleChange = e => {
    setAnotation(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const { token, userId } = localStorage;

    const selectedCategory = {
      0: 'morally preferable',
      1: 'morally unpreferable',
      2: 'aesthetically preferable',
      3: 'aesthetically unpreferable',
      4: 'not unethical, but strange',
    };

    const data = {
      category: selectedCategory[category],
      content: anotation,
      authorId: userId,
    };

    try {
      const response = await fetch(`${apiURL}/api2/text`, {
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
        const json = await response.json();

        // TODO: add a notification from notification
        console.log(json);

        notification('annotation created!');
        props.history.push('/profile/annotations');
      } else {
        console.error('error while fetching data!');
      }
    } catch (error) {
      console.error('there was an error ->', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Typography variant='h6' gutterBottom>
        Create a new annotation
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id='standard-name'
          label='Annotation'
          className={classes.textField}
          value={anotation}
          onChange={handleChange}
          margin='normal'
          required
          multiline
          rows='5'
        />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='category-simple'>Category</InputLabel>
          <Select
            value={category}
            onChange={e => setCategory(e.target.value)}
            inputProps={{
              name: 'category',
              id: 'category-simple',
            }}
          >
            <MenuItem selected value={0}>
              Morally preferable

              {/* <img style={{ width: 20, height: 20}} src="https://avatars0.githubusercontent.com/u/24904209?s=460&v=4" alt="" srcSet=""/> */}

            </MenuItem>
            <MenuItem value={1}>Morally unpreferable</MenuItem>
            <MenuItem value={2}>Aesthetically preferable</MenuItem>
            <MenuItem value={3}>Aesthetically unpreferable</MenuItem>
            <MenuItem value={4}>Not unethical, but strange</MenuItem>
          </Select>
        </FormControl>

        <Button
          color='primary'
          variant='outlined'
          style={{ marginRight: '10px' }}
          type='submit'
        >
          Save
        </Button>
        <Button color='secondary' type='button' variant='outlined'>
          <Link className={classes.link} to='/'>
            Cancel
          </Link>
        </Button>
      </form>
    </div>
  );
}

export default NewAnotation;