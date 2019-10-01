import React, { useEffect, useState } from 'react';

import { apiURL } from '../globals';
import { Loader } from '../components';

import Image from './Image';
import Pagination from '../Components/Pagination';
import { useStyles } from './style';

function GetImages() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getImageData() {
      const token = localStorage.getItem('token');

      const response = await fetch(`${apiURL}/api2/image/page/${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setImages(data.images);
      setCount(data.count);
      setLoading(false);
    }

    getImageData();
  }, [page]);

  async function deleteImage(id) {
    setLoading(true);

    // Remove from the DOM
    if (window.confirm('are you sure you want to delete this image?')) {
      try {
        const { token } = localStorage;

        const response = await fetch(`${apiURL}/api2/image/${id}`, {
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
        // TODO: Add a notification with the response
        console.log(data);
        
        setImages(images.filter(el => el._id !== id));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const imagesEl = images.map(el => (
    <Image key={el._id} el={el} deleteImage={deleteImage} />
  ));

  if (loading) {
    return <Loader />;
  }

  if (!images.length) {
    return (
      <div style={{ textAlign: 'center' }}>
        you haven't annotated any image yet...
      </div>
    );
  }

  return (
    <div>
      <h3 className={classes.title}>All images</h3>
      {imagesEl}
      <Pagination
        setPage={setPage}
        setLoading={setLoading}
        count={count}
        page={page}
      />
    </div>
  );
}

export default GetImages;
