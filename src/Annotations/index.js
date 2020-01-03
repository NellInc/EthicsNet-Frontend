import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Pagination from '../Components/Pagination';
import API from '../globals';
import { Notification } from '../Store';
import { useStyles } from './style';
import Annotation from './Annotation';

function Anotations(props) {
  const classes = useStyles();
  const [anotations, setAnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const notification = useContext(Notification);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  function filterAnotations(idRemoved) {
    setAnotations(anotations.filter(el => el._id !== idRemoved));
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    document.title = 'EthicsNet - Annotations';
    async function getUserData() {
      try {
        const { data } = await API.get(`/api2/text/page/${page}`);
        setAnotations(data.anotations);
        setCount(data.count);
        setLoading(false);
      } catch (error) {
        console.log('error -> ', error);
        notification('There was a problem processing your request', '', 'danger');
      }
    }
    getUserData();
    // if you place 'loading' here it will run twice (make 2 api calls)
  }, [page, loading, notification]);

  const handleAnotationClick = (id, type) => {
    if (type === 'edit') {
      props.history.push(`/profile/annotations/edit/${id}`);
    } else if (type === 'delete') {
      setIdToDelete(id);
      setOpen(true);
    }
  };

  async function editAnnotation(id, values) {
    setLoading(true);
    try {
      const { content } = values;

      const {status} = await API(`/api2/text/${id}`, {
        content
      });

      if (status === 200) {
        notification('Text annotation updated!');
      } else {
        notification(
          'There was a problem editing the text annotation',
          '',
          'danger'
        );
      }
    } catch (error) {
      console.error(error);
      notification(
        'There was a problem editing the text annotation',
        '',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  }

  const anotationsComponent = anotations.map(el => (
    <Annotation
      handleClose={handleClose}
      filterAnotations={filterAnotations}
      idToDelete={idToDelete}
      el={el}
      handleAnotationClick={handleAnotationClick}
      open={open}
      key={el._id}
      editAnnotation={editAnnotation}
    />
  ));

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (!anotations.length) {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          you haven't annotated any text yet...
        </div>
        <Button
          color='secondary'
          variant='outlined'
          onClick={() =>
            handleAnotationClick(props.history.push('/how-to-use'))
          }
        >
          How to use
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3 className={classes.title}>Annotations</h3>
      <div>{anotationsComponent}</div>

      <Pagination
        setPage={setPage}
        setLoading={setLoading}
        count={count}
        page={page}
      />
    </div>
  );
}

export default Anotations;
