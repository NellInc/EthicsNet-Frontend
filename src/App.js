import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import './App.css';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '700px',
    margin: 'auto',
    border: '1px solid #000',
    padding: '30px',
    borderRadius: '5px',
  },
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

function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    firstName: 'emerson',
    lastName: 'lopes',
    email: 'lupuselit@gmail.com',
    password: '12345',
    age: '23',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form data: ', values);

    setLoading(true);
    // fetch('localhost:5000/auth/register');
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
