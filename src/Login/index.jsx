import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Notification } from '../Store';
import API from '../globals';
import { Loader } from '../components';
import { useStyles } from './style';

function Login() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const notification = useContext(Notification);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    async function healthcheck() {
      try {
        await API.get('/healthcheck');
      } catch {
        // The health check is advisory. Login remains usable when the API is
        // temporarily unavailable, and the request must not create an
        // unhandled rejection in the browser.
      }
    }
    healthcheck();
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async e => {
    const { email, password } = values;
    e.preventDefault();
    try {
      const { data, message } = await API.post('/auth/authenticate', {
        email,
        password,
      });
      if (message) {
        notification(message);
      }
      const { token, user } = data;
      localStorage.setItem('userId', user._id);
      localStorage.setItem('userName', user.firstName);
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('lastclear', new Date().getTime());
      localStorage.setItem('token', token);
      // history.push('/');
      window.location.reload();
    } catch (error) {
      notification(error.message, 'Login failed', 'danger');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <header className='App-header'>
        <p>EthicsNet - Login</p>
      </header>

      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            className={classes.textField}
            id='email'
            label='Email'
            type='email'
            value={values.email}
            onChange={handleChange('email')}
            margin='normal'
          />

          <TextField
            required
            className={classes.textField}
            type='password'
            id='password'
            label='Password'
            value={values.password}
            onChange={handleChange('password')}
            margin='normal'
          />
        </div>

        <p className={classes.account}>
          don't you have an account?{' '}
          <span
            className={classes.link}
            onClick={() => navigate('/register')}
          >
            register
          </span>{' '}
          instead
        </p>

        <Button type='submit' variant='contained' color='primary'>
          login
        </Button>
      </form>
    </div>
  );
}

export default Login;
