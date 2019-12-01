import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { apiURL } from '../globals';
import { Loader } from '../components';
import { Notification } from '../Store';
import { useStyles } from './style';
import RangeSlider from '../Slider';

function NewAnotation(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [anotation, setAnotation] = useState('');

  const notification = useContext(Notification);

  const [contentAction, setContentAction] = useState(50);
  const [toneForm, setToneForm] = useState(50);

  const handleChange = e => {
    setAnotation(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const { token, userId } = localStorage;

    const data = {
      categoryRangeContentAction: contentAction,
      categoryRangeToneForm: toneForm,
      content: anotation,
      authorId: userId,
    };

    // sao pessoas reais, é assim que eu quero me entregar a uma dor quando eu to sentindo

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

        <RangeSlider
          range={contentAction}
          setValue={setContentAction}
          name='Content/Action'
        />

        <RangeSlider range={toneForm} setValue={setToneForm} name='Tone/Form' />

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
