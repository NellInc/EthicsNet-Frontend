import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
  textField: {
    width: '100%',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}));

function NewAnotation(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [anotation, setAnotation] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(false);
      console.log(loading);
    }

    fetchData();
  }, [loading]);

  const handleChange = e => {
    setAnotation(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('submiting!');
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Create a new anotation
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-name"
          label="Anotation"
          className={classes.textField}
          value={anotation}
          onChange={handleChange}
          margin="normal"
          required
          multiline
          rows="5"
        />

        <Button
          color="primary"
          variant="outlined"
          style={{ marginRight: '10px' }}
          type="submit"
        >
          Save
        </Button>
        <Button color="secondary" type="button" variant="outlined">
          <Link className={classes.link} to="/">Cancel</Link>
        </Button>
      </form>
    </div>
  );
}

export default NewAnotation;
