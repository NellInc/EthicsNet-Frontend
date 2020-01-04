import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Notification } from '../Store';
import API from '../globals';
import { Loader } from '../components';
import { useStyles } from './style';

function Login({ history }) {
  const classes = useStyles();

  const notification = useContext(Notification);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    async function healthcheck() {
      const response = await API.get('/healthcheck');
      console.log(response);
      console.log(response.data.msg);
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
            onClick={() => history.push('/register')}
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
