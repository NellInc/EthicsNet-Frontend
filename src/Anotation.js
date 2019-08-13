import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
    '@media (min-width:600px)': {},
  },
  textField: {
    width: '100%',
  },
  loaderWrapper: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Anotation(props) {
  const classes = useStyles();

  const [anotation, setAnotation] = useState({});
  const [anotationEdit, setAnotationEdit] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { isLogged } = localStorage;
      const { id } = props.match.params;
      const { token } = localStorage;

      const response = await fetch(
        `http://localhost:5000/api/user/anotations/${id}`,
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
      setLoading(false);
    }

    fetchData();
  }, [loading, props.match.params]);

  const editAnotation = async () => {
    const { id } = props.match.params;
    const { token } = localStorage;

    const response = await fetch(
      `http://localhost:5000/api/user/anotations/${id}`,
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
        }),
      }
    );

    const data = await response.json();
  };

  const handleChange = e => {
    setAnotationEdit(e.target.value);
  };

  const userId = props.match.params.id;

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <p>{anotation.createdAt.substring(0, 10)}</p>
      <TextField
        id="standard-multiline-flexible"
        label="edit anotation"
        multiline
        rowsMax="10"
        value={anotationEdit}
        onChange={handleChange}
        className={classes.textField}
        margin="normal"
      />

      <Button
        onClick={editAnotation}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Save
      </Button>

      <Button variant="contained" color="secondary" className={classes.button}>
        Cancel
      </Button>
    </div>
  );
}

export default Anotation;