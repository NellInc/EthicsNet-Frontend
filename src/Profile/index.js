import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { apiURL } from '../globals';
import { useStyles } from './style';
import Info from './Info';

function Profile(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const setUserData = useState({})[1];

  const [values, setValues] = useState({
    name: '',
    last: '',
    email: '',
    country: '',
    earnings: '',
    ethnicity: '',
    state: '',
    age: '',
    political: '',
    religious: '',
    sexualOrientation: '',
    language: '',
    education: '',
    social: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem('token');

      const response = await fetch(`${apiURL}/api/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log('USER -> ', data, response.status);

      if (response.status === 200) {

        setUserData(data.user);

        const {
          firstName,
          lastName,
          email,
          country,
          state,
          age,
          political,
          religious,
          sexualOrientation,
          language,
          education,
          social,
          earnings,
          ethnicity
        } = data.user

        setValues({
          ...values,
          name: firstName,
          last: lastName,
          email,
          country,
          state,
          age,
          political,
          religious,
          sexualOrientation,
          language,
          education,
          social,
          earnings,
          ethnicity,
        }); 
      } else if (response.status === 404) {
        // props.history.push('/logged-out')
        // alert('your user doesnt exist')

        localStorage.isLogged = null;
        window.location.reload();
      }
      setLoading(false);
    }

    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSubmit = async e => {
    e.preventDefault();

    const {
      name,
      last,
      email,
      country,
      state,
      age,
      political,
      religious,
      sexualOrientation,
      language,
      education,
      social,
      earnings,
      ethnicity
    } = values

    const data = {
      firstName: name,
      lastName: last,
      email,
      country,
      state,
      age,
      political,
      religious,
      sexualOrientation,
      language,
      education,
      social,
      earnings,
      ethnicity
    };

    console.log('VALUES -> ', values);

    const { token, userId } = localStorage;
    const response = await fetch(`${apiURL}/api/user/${userId}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    setLoading(true);
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
      <header className={classes.header}>ETHICS ETH - MY PROFILE</header>

      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="standard-name"
              label="First name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange('name')}
              margin="normal"
              required
            />

            <TextField
              id="standard-name"
              label="Last name"
              className={classes.textField}
              value={values.last}
              onChange={handleChange('last')}
              margin="normal"
              required
            />

          </div>

          <div>
            <TextField
              style={{ marginBottom: '20px' }}
              id="standard-name"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleChange('email')}
              margin="normal"
              type="email"
              required
            />

            <TextField
              id="age"
              label="Age"
              type="number"
              className={classes.textField}
              value={values.age}
              onChange={handleChange('age')}
              margin="normal"
              required
            />

          </div>

          <Info values={values} handleChange={handleChange}/>

          <div className={classes.buttonsWrapper}>
            <Button
              color="primary"
              variant="outlined"
              style={{ marginRight: '10px' }}
              type="submit"
            >
              Save
            </Button>

            <Button color="secondary" type="button" variant="outlined">
              Delete account
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Profile;
