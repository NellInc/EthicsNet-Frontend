import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { apiURL } from './globals';
import { Loader } from './components';
import { Notification } from './Store';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
  textField: {
    width: '100%',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  loaderWrapper: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function NewAnotation(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [anotation, setAnotation] = useState('');

  const notification = useContext(Notification);

  useEffect(() => {
    setLoading(false);
    notification('welcome back!');
  }, []);

  const handleChange = e => {
    setAnotation(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const { token, userId } = localStorage;

    const data = {
      content: anotation,
      authorId: userId
    }

    try {
      const response = await fetch(`${apiURL}/api/post-text`, {
       method: 'POST',
       mode: 'cors',
       cache: 'no-cache',
       credentials: 'same-origin',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
       },
       redirect: 'follow',
       referrer: 'no-referrer',
       body: JSON.stringify(data),
     });

     console.log(response.status);

     if (response.status === 200) {
       const json = await response.json();
       notification('annotation created!');
       props.history.push('/profile/annotations')
     } else {
       console.log('error while fetching data!');
     }

    } catch(error) {
      console.log('there was an error ->', error);
    }

    console.log('submiting!');
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Create a new anotation
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-name"
          label="Anotation"
          className={classes.textField}
          value={anotation}
          onChange={handleChange}
          margin="normal"
          required
          multiline
          rows="5"
        />

        <Button
          color="primary"
          variant="outlined"
          style={{ marginRight: '10px' }}
          type="submit"
        >
          Save
        </Button>
        <Button color="secondary" type="button" variant="outlined">
          <Link className={classes.link} to="/">Cancel</Link>
        </Button>
      </form>
    </div>
  );
}

export default NewAnotation;
