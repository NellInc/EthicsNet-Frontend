import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import './App.css';

import { IsLogged } from './Store'

import { apiURL } from './globals';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '47%',
  },
  submit: {
    marginTop: '20px',
  },
  loaderWrapper: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function App(props) {
  const classes = useStyles();
  const [isLogged, setIsLogged] = useContext(IsLogged)

  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleSubmit = async e => {
    const data = values;
    e.preventDefault();
    console.log(`${apiURL}/auth/register`);
    
    try {
      const response = await fetch('167.71.163.123/auth/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      const { token, user } = await response.json();
      localStorage.setItem('userId', user._id);
      localStorage.setItem('userName', user.firstName);
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('token', token);
      // setIsLogged('true')
      // props.history.push('/profile');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <header className="App-header">
        <p>Ethics eth - sign up</p>
      </header>

      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            className={classes.textField}
            id="first-name"
            label="First Name"
            value={values.firstName}
            onChange={handleChange('firstName')}
            margin="normal"
          />

          <TextField
            required
            className={classes.textField}
            id="last-name"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange('lastName')}
            margin="normal"
          />
        </div>

        <div>
          <TextField
            required
            className={classes.textField}
            id="email"
            type="email"
            label="Email"
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
          />
          <TextField
            required
            className={classes.textField}
            id="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
          />
        </div>

        <Button
          className={classes.submit}
          type="submit"
          variant="contained"
          color="primary"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default App;
