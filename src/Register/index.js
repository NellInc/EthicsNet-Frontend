import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import '../App.css';

import TermsAndConditions from '../TermsAndConditions';
import PrivacyPolicy from '../PrivacyPolicy';
import { Notification } from '../Store';
import { apiURL } from '../globals';
import { Loader } from '../components';
import { useStyles } from './style';
import API from '../globals';

function Register() {
  const classes = useStyles();
  const notification = useContext(Notification);
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(0);
  const [passCaptcha, setPassCaptcha] = useState(false);

  const recaptchaRef = React.createRef();

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });

    const recaptchaValue = recaptchaRef.current.getValue();
    const { firstName, lastName, email, password } = values;

    if (
      recaptchaValue &&
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      password !== ''
    ) {
      setPassCaptcha(true);
    } else {
      setPassCaptcha(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { message, data } = await API.post('/auth/register', values);
      // here will always be 200
      if (message) {
        notification(message);
      }
        const { token, user } = data;
        localStorage.setItem('userId', user._id);
        localStorage.setItem('userName', user.firstName);
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('lastclear', new Date().getTime());
        localStorage.setItem('token', token);
        window.location.reload();
    } catch (error) {
      console.error(error);
      notification(error.message, 'Error', 'danger');
    }
  };

  const onChange = value => {
    const { firstName, lastName, email, password } = values;
    if (
      value &&
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      password !== ''
    ) {
      setPassCaptcha(true);
    }
  };

  function next() {
    async function checkUser() {
      try {
        await API.get('/auth/email/' + values.email);
        if (passCaptcha) setShowTerms(showTerms + 1)
        else alert('nah')
      } catch (error) {
        notification(error.message, 'Error', 'danger');
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }

  function previous() {
    setShowTerms(showTerms - 1);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <header className='App-header'>
        <p>EthicsNet - Sign up</p>
      </header>

      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            className={classes.textField}
            id='first-name'
            label='First Name'
            value={values.firstName}
            onChange={handleChange('firstName')}
            margin='normal'
          />

          <TextField
            required
            className={classes.textField}
            id='last-name'
            label='Last Name'
            value={values.lastName}
            onChange={handleChange('lastName')}
            margin='normal'
          />
        </div>
        <div>
          <TextField
            required
            className={classes.textField}
            id='email'
            type='email'
            label='Email'
            value={values.email}
            onChange={handleChange('email')}
            margin='normal'
          />
          <TextField
            required
            className={classes.textField}
            id='password'
            type='password'
            label='Password'
            value={values.password}
            onChange={handleChange('password')}
            margin='normal'
          />
        </div>
        <div className={classes.gender}>
          <TextField
            // required
            className={classes.textField}
            id='gender'
            type='text'
            label='Gender'
            value={values.gender}
            onChange={handleChange('gender')}
            margin='normal'
          />
        </div>

        {/* 37:30 - 38:30 */}
        <ReCAPTCHA
          sitekey='6LcxVMUUAAAAANTT9RCdIyHNbYTTC6cDwNARknvT'
          onChange={onChange}
          ref={recaptchaRef}
          style={{ display: showTerms ? 'none' : 'block' }}
        />

        {!showTerms && (
          <Button
            className={classes.submit}
            type='button'
            onClick={next}
            variant='contained'
            color='primary'
            disabled={!passCaptcha}
          >
            Next
          </Button>
        )}
        {showTerms > 0 && (
          <div className={classes.headline}>
            To create an EthicsNet Account, you’ll need to agree to the{' '}
            <a
              href='https://www.termsfeed.com/terms-conditions/729e707a3a2a572778819a2b17eeec2b'
              target='_blank'
              rel='noopener noreferrer'
            >
              Terms of Service
            </a>{' '}
            below. In addition, when you create an account, we process your
            information as described in our{' '}
            <a
              href='https://www.termsfeed.com/privacy-policy/9966271a11492eb0ef2fd7776baaa38c'
              target='_blank'
              rel='noopener noreferrer'
            >
              Privacy Policy
            </a>
            .
          </div>
        )}
        {showTerms === 1 && (
          <div>
            <TermsAndConditions />
            <Button
              className={classes.submit}
              type='button'
              onClick={next}
              variant='contained'
              color='primary'
            >
              Next
            </Button>
          </div>
        )}
        {showTerms === 2 && (
          <div>
            <PrivacyPolicy />

            <Button
              className={classes.submit}
              style={{ marginRight: 10 }}
              type='button'
              onClick={previous}
              variant='contained'
              color='primary'
            >
              Previous
            </Button>

            <Button
              className={classes.submit}
              type='submit'
              variant='contained'
              color='primary'
            >
              I agree
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
