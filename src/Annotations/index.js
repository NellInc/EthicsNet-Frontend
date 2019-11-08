import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import DeleteDialog from '../DeleteDialog';
import Pagination from '../Components/Pagination';
import { apiURL } from '../globals';
import { useStyles } from './style';
import Category from '../Components/Category';

function Anotations(props) {
  const classes = useStyles();
  const [anotations, setAnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  function filterAnotations(idRemoved) {
    setAnotations(anotations.filter(el => el._id !== idRemoved));
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    document.title = 'EthicsNet - Annotations'
    async function getUserData() {
      const token = localStorage.getItem('token');

      const response = await fetch(`${apiURL}/api2/text/page/${page}`, {
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

      console.log('annoatations -> ', data);

      setAnotations(data.anotations);
      setCount(data.count);
      setLoading(false);
    }

    getUserData();

    // if you place 'loading' here it will run twice (make 2 api calls)
  }, [page]);

  const handleAnotationClick = (id, type) => {
    if (type === 'edit') {
      props.history.push(`/profile/annotations/edit/${id}`);
    } else if (type === 'delete') {
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

      <p>Annotation: </p>
      <p className={classes.content}>{el.content}</p>
      <hr className={classes.hr} />

      {/* Keep compatible with the extensions text annotation flow */}
      {el.category ? (
        <div className={classes.categoryWrapper}>
          <span className={classes.category}>{el.category}</span>
          <br />
        </div>
      ) : (
        <div>
          <Category
            title='Content/Action'
            categoryRangeContentAction={el.categoryRangeContentAction}
          />

          <Category
            title='Tone/Form'
            categoryRangeContentAction={el.categoryRangeToneForm}
          />

          <hr className={classes.hr} />
        </div>
      )}

      {el.font === 'none' || el.font === '' ? null : (
        <small className={classes.font}>
          Annotated from:{' '}
          <a target='_blank' rel='noopener noreferrer' href={el.font}>
            {el.font}
          </a>
        </small>
      )}

      <p className={classes.date}>{el.createdAt.substring(0, 10)} </p>

      <div>
        <Button
          color='primary'
          variant='outlined'
          style={{ marginRight: '10px' }}
          onClick={() => handleAnotationClick(el._id, 'edit')}
        >
          Edit
        </Button>

        <Button
          color='secondary'
          variant='outlined'
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
