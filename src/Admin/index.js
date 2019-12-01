import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { useStyles } from './style';
import { apiURL } from '../globals';
import { Loader } from '../components';

function Admin(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});

  useEffect(() => {
    async function getUserData() {
      const { token } = localStorage;

      const response = await fetch(`${apiURL}/api2/user`, {
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
      setLoading(false);

      if (!data.user.isAdmin) {
        props.history.push('/');
      }
    }
    getUserData();
  }, [setLoading, props.history]);

  useEffect(() => {
    async function getStats() {
      const { token } = localStorage;

      const response = await fetch(`${apiURL}/api2/admin/stats`, {
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
      setValues(data);
    }
    getStats();
  }, [props.history]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.admin}>
      <h1>General info</h1>

      <h2>Users created: {values.numUsers}</h2>
      <h2>Tetxs annotated: {values.numTexts}</h2>
      <h2>Images annotated: {values.numImages}</h2>
      <h2>Videos annotated: {values.numVideos}</h2>

      <Button variant='outlined'>This is a button</Button>
    </div>
  );
}

export default Admin;
