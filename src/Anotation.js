import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { apiURL } from './globals';
import { LinkBtn } from './components';
import { Loader } from './components';

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
  }
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
      setLoading(false);
    }

    fetchData();
  }, [loading, props.match.params]);

  const editAnotation = async () => {
    setLoading(true);

    const { id } = props.match.params;
    const { token } = localStorage;

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
        }),
      }
    );
    console.log(response.status);

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      
    } else {
      console.log('there was an error', response.status);
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
        rowsMax="10"
        value={anotationEdit}
        onChange={handleChange}
        className={classes.textField}
        margin="normal"
      />

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
