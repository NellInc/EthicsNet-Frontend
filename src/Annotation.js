import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { apiURL } from './globals';
import { LinkBtn } from './components';
import { Loader } from './components';
import { Notification } from './Store';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
    '@media (min-width:600px)': {},
  },
  textField: {
    width: '100%',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  button: {
    marginRight: '10px'
  },
  formControl: {
    width: '100%',
    marginBottom: '20px'
  }
}));

function Anotation(props) {
  const classes = useStyles();

  const [anotation, setAnotation] = useState({});
  const [anotationEdit, setAnotationEdit] = useState('');
  const [category, setCategory] = useState(0);
  const [loading, setLoading] = useState(true);

  const notification = useContext(Notification);

  useEffect(() => {
    async function fetchData() {
      const { isLogged } = localStorage;
      const { id } = props.match.params;
      const { token } = localStorage;

      const response = await fetch(
        `${apiURL}/api/user/anotations/${id}`,
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setAnotation(data.anotation);
      setAnotationEdit(data.anotation.content);
      
      const selectedCategory = {
        ['morally preferable']: 0,
        ['morally unpreferable']: 1,
        ['aesthetically preferable']: 2,
        ['aesthetically unpreferable']: 3,
      };

      console.log('SELECTED -> ', data);

      setCategory(selectedCategory[data.anotation.category])
      setLoading(false);
    }

    fetchData();
  }, [loading]);

  const editAnotation = async () => {
    setLoading(true);

    const { id } = props.match.params;
    const { token } = localStorage;

    const selectedCategory = {
      0: 'morally preferable',
      1: 'morally unpreferable',
      2: 'aesthetically preferable',
      3: 'aesthetically unpreferable',
    };

    const response = await fetch(
      `${apiURL}/api/user/anotations/${id}`,
      {
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
          category: selectedCategory[category]
        }),
      }
    );
    console.log(response.status);
    const data = await response.json();

    if (response.status === 200) {
      notification('annotation saved!')
    } else {
      console.log('there was an error', response.status);
      notification(data.error, 'there was an error', 'danger');
    }
  };

  const handleChange = e => {
    setAnotationEdit(e.target.value);
  };

  const userId = props.match.params.id;

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div>
      <p>{anotation.createdAt.substring(0, 10)}</p>

      <TextField
        id="standard-multiline-flexible"
        label="edit anotation"
        multiline
        rowsMax="30"
        value={anotationEdit}
        onChange={handleChange}
        className={classes.textField}
        margin="normal"
      />

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="category-simple">Category</InputLabel>
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
          </Select>
        </FormControl>

      <Button
        onClick={editAnotation}
        variant="outlined"
        color="primary"
        className={classes.button}
      >
        Save
      </Button>

      <LinkBtn 
        variant="outlined"
        color="secondary"
        to="/profile/annotations"
        name="cancel"
      />

    </div>
  );
}

export default Anotation;
