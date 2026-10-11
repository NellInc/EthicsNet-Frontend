import { useSoftNavigate } from '../hooks/useSoftNavigate';
import React, { useState, useEffect } from 'react';
import {  } from 'react-router-dom';
// import Button from '@mui/material/Button';
import Table from './Table';

import { useStyles } from './style';
import { apiFetch } from '../globals';
import { Loader } from '../components';

function Admin() {
  const { classes } = useStyles();
  const navigate = useSoftNavigate();

  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});

  useEffect(() => {
    async function getUserData() {
      try {
        const { token } = localStorage;

        const response = await apiFetch(`/api2/user`, {
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
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, [setLoading, navigate]);

  useEffect(() => {
    async function getStats() {
      try {
        const { token } = localStorage;

        const response = await apiFetch(`/api2/admin/stats`, {
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
      } catch (error) {
        console.error(error);
      }
    }
    getStats();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.admin}>
      <h1>General info</h1>
{/*
      <h2>Users created: {values.numUsers}</h2>
      <h2>Tetxs annotated: {values.numTexts}</h2>
      <h2>Images annotated: {values.numImages}</h2>
      <h2>Videos annotated: {values.numVideos}</h2> */}

      <Table
        numUsers={values.numUsers}
        numTexts={values.numTexts}
        numImages={values.numImages}
        numVideos={values.numVideos}
      />
    </div>
  );
}

export default Admin;
