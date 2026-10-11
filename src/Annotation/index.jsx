import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { apiFetch } from '../globals';
import { LinkBtn } from '../components';
import { Loader } from '../components';
import { Notification } from '../Store';

import { useStyles } from './style';

function Anotation(props) {
  const { classes } = useStyles();
  const params = useParams();
  const id = params.id || props.match?.params?.id;
  const [refresh, setRefresh] = useState(0);

  const [anotation, setAnotation] = useState(null);
  const [anotationEdit, setAnotationEdit] = useState('');
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(true);

  const notification = useContext(Notification);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setAnotation(null);
      try {
        const { token } = localStorage;
        const response = await apiFetch(`/api2/text/${id}`, {
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

        if (response.status !== 200 || !data.anotation) throw new Error(data.error || response.statusText);
        setAnotation(data.anotation);
        setAnotationEdit(data.anotation.content);

        const selectedCategory = {
          'morally preferable': 0,
          'morally unpreferable': 1,
          'aesthetically preferable': 2,
          'aesthetically unpreferable': 3,
          'not unethical, but strange': 4
        };

        setCategory(selectedCategory[data.anotation.category]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refresh]);

  const editAnotation = async () => {
    try {
      setLoading(true);

      const { token } = localStorage;

      const selectedCategory = {
        0: 'morally preferable',
        1: 'morally unpreferable',
        2: 'aesthetically preferable',
        3: 'aesthetically unpreferable',
        4: 'not unethical, but strange',
      };

      const response = await apiFetch(`/api2/text/${id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: anotationEdit,
          category: selectedCategory[category],
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        notification('annotation saved!');
        setRefresh(value => value + 1);
      } else {
        notification(data.error, 'there was an error', 'danger');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    setAnotationEdit(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <p>{anotation?.createdAt?.substring(0, 10) || ''}</p>

      <TextField
        id='standard-multiline-flexible'
        label='edit anotation'
        multiline
        rowsMax='30'
        value={anotationEdit}
        onChange={handleChange}
        className={classes.textField}
        margin='normal'
      />

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='category-simple'>Category</InputLabel>
        <Select
          value={category}
          onChange={e => setCategory(e.target.value)}
          inputProps={{
            name: 'category',
            id: 'category-simple',
          }}
        >
          <MenuItem selected value={0}>
            Morally preferable
          </MenuItem>
          <MenuItem value={1}>Morally unpreferable</MenuItem>
          <MenuItem value={2}>Aesthetically preferable</MenuItem>
          <MenuItem value={3}>Aesthetically unpreferable</MenuItem>
          <MenuItem value={4}>Not unethical, but strange</MenuItem>
        </Select>
      </FormControl>

      <Button
        onClick={editAnotation}
        disabled={!anotation}
        variant='outlined'
        color='primary'
        className={classes.button}
      >
        Save
      </Button>

      <LinkBtn
        variant='outlined'
        color='secondary'
        to='/profile/annotations'
        name='cancel'
      />
    </div>
  );
}

export default Anotation;
