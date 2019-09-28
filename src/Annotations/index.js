import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import DeleteDialog from '../DeleteDialog';
import { apiURL } from '../globals';
import { useStyles } from './style';

function Anotations(props) {
  const classes = useStyles();
  const [anotations, setAnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  function filterAnotations(idRemoved) {
    console.log('id to remove-> ', idRemoved);
    setAnotations(anotations.filter(el => el._id !== idRemoved));
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem('token');

      const response = await fetch(`${apiURL}/api/user/anotations`, {
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
      console.log(data);

      setAnotations(data.anotations);
      setLoading(false);
    }

    getUserData();
  }, [loading]);

  const handleAnotationClick = (id, type) => {
    if (type === 'edit') {
      props.history.push(`/profile/annotations/edit/${id}`);
    } else if (type === 'delete') {
      console.log('delete id ->', id);
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
      <span className={classes.category}>{el.category}</span>
      <p> {el.content} </p>

      {el.font === 'none' || el.font === '' ? null : (
        <small className={classes.font}>
          Annotated from: <a target="_blank" rel="noopener noreferrer" href={el.font}>{el.font}</a>
        </small>
      )}

      <p className={classes.date}>{el.createdAt.substring(0, 10)} </p>

      <div>
        <Button
          color="primary"
          variant="outlined"
          style={{ marginRight: '10px' }}
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
      <h3 className={classes.title}>Annotations</h3>
      <div>{anotationsComponent}</div>
    </div>
  );
}

export default Anotations;