import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';

import { Notification } from '../Store'
import { apiURL } from '../globals';
import { useStyles } from './style';

function App() {
  const classes = useStyles();
  const notification = useContext(Notification);
  const [loading] = useState(false);
  
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

  const handleSubmit = async e => {
    const data = values;
    e.preventDefault();
    console.log(`${apiURL}/auth/register`);
    
    try {
      const response = await fetch(`${apiURL}/auth/register`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (response.status === 400) {
        notification(json.error, 'registration failed', 'danger');
      } else if (response.status === 200) {
        notification('welcome to ethics net!');
        const { token, user } = json;
        localStorage.setItem('userId', user._id);
        localStorage.setItem('userName', user.firstName);
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('token', token);
        window.location.reload();
      } else {
        notification('there was an error', 'we could not register you', 'danger');
      }
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
