import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import { apiURL } from '../globals';
import { useStyles } from './style';
import { Loader } from '../components';

function GetImages() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getImageData() {
      const token = localStorage.getItem('token');

      const response = await fetch(`${apiURL}/api/user/images/${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      // console.log('Images fetched -> ', data.images);
      console.log('====================================');
      console.log('images -> ', data);
      console.log('====================================');

      setImages(data.images);
      setCount(data.count);
      setLoading(false);
    }

    getImageData();
  }, [page]);

  async function deleteImage(id) {
    setLoading(true);
    console.log(id);

    // Remove from the DOM
    if (window.confirm('are you sure you want to delete this image?')) {
      try {
        const { token } = localStorage;

        const response = await fetch(`${apiURL}/api/user/images/${id}`, {
          method: 'DELETE',
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
        setImages(images.filter(el => el._id !== id));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const imagesEl = images.map(el => (
    <div key={el._id} className={classes.image}>
      <p className={classes.title}>{el.title}</p>
      <hr className={classes.hr} />
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={el.image} alt='' />
      </div>

      <hr className={classes.hr} />
      <p className={classes.font}>
        Font: <a href={el.imageFont}>{el.imageFont}</a>
      </p>
      <p>
        <span className={classes.category}>{el.category}</span>
      </p>
      <p className={classes.description}>{el.description}</p>

      <Button
        color='secondary'
        variant='outlined'
        onClick={() => deleteImage(el._id)}
      >
        Delete
      </Button>
    </div>
  ));

  function handleNextPage() {
    if (page * 10 < count) {
      setPage(page + 1);
      setLoading(true);
    }
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1);
      setLoading(true);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className={classes.title}>All images</h3>
      {imagesEl}

      <div className={classes.pagination}>
        <Button
          color='primary'
          variant='outlined'
          style={{ marginRight: '10px' }}
          onClick={handlePreviousPage}
        >
          Previous Page
        </Button>

        <span>{page}</span>

        <Button
          color='primary'
          variant='outlined'
          style={{ marginLeft: '10px' }}
          onClick={handleNextPage}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}

export default GetImages;
