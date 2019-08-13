import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import DeleteDialog from './DeleteDialog'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: '20px 20px',
    '&:hover': {
      // backgroundColor: 'rgb(7, 177, 77, 0.1)',
      boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.4)',
      cursor: 'pointer',
    },
  },
  title: {
    textAlign: 'center',
  },
  loaderWrapper: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Anotations(props) {
  const classes = useStyles();
  const [anotations, setAnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  function handleClickOpen() {
    setOpen(true);
  }

  function filterAnotations(idRemoved) {
    console.log('id to remove-> ', idRemoved);
    setAnotations(anotations.filter(el => el._id !== idRemoved))
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:5000/api/user/anotations',
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
      setAnotations(data.anotations);
      setLoading(false);
    }

    getUserData();
  }, [loading]);

  const handleAnotationClick = (id, type) => {
    if (type === 'edit') {
      props.history.push(`/profile/anotations/edit/${id}`)
    } else if (type === 'delete') {
      console.log('delete id ->', id)
      setIdToDelete(id);
      setOpen(true);
    }
  };

  const anotationsComponent = anotations.map(el => (
    <Card className={classes.paper} key={el._id}>
      
      <DeleteDialog 
        content={el.content} 
        open={open} 
        handleClose={handleClose}
        id={idToDelete}
        elId={el._id}
        filterAnotations={filterAnotations}
      />

      <p> {el.content} </p>
      <p> {el.createdAt.substring(0, 10)} </p>

      <div>
        <Button
          color="primary"
          variant="outlined"
          style={{marginRight: '10px'}}
          onClick={() => handleAnotationClick(el._id, 'edit')}
        >
          Edit
        </Button>

        <Button
          color="secondary"
          variant="outlined"
          onClick={() => handleAnotationClick(el._id, 'delete')}
        >
          Delete
        </Button>
      </div>
    </Card>
  ));

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h3 className={classes.title}>Anotations</h3>
      <div>{anotationsComponent}</div>
    </div>
  );
}

export default Anotations;