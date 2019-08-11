import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import { IsLogged } from './Store';

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
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Login(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const [isLogged, setIsLogged] = useContext(IsLogged);

  const [values, setValues] = React.useState({
    email: 'lupuselit@gmail.com',
    password: '12345',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {}, [values]);

  const handleSubmit = async e => {
    const data = values;
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/authenticate', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
      });

      const { token, user } = await response.json();
      localStorage.setItem('userId', user._id);
      localStorage.setItem('userName', user.firstName);
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('token', token);
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
        <p>Ethics eth - login</p>
      </header>

      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            className={classes.textField}
            id="email"
            label="email"
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
          />

          <TextField
            required
            className={classes.textField}
            type="password"
            id="password"
            label="password"
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
          login
        </Button>
      </form>
    </div>
  );
}

export default Login;
