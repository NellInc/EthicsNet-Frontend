import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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

function Login() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = React.useState({
    email: 'lupuselit@gmail.com',
    password: '12345',
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
    console.log('form data: ', values);
    setLoading(true);
    // fetch('localhost:5000/auth/register');

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
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

      const json = await response.json();
      console.log(json);
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
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default Login;
