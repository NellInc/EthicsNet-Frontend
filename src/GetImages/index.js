import React, { useEffect, useState, useContext } from 'react';

import { Notification } from '../Store';
import { Loader } from '../components';
import API from '../globals';

import Image from './Image';
import Pagination from '../Components/Pagination';
import { useStyles } from './style';

function GetImages() {
  const classes = useStyles();

  const notification = useContext(Notification);

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getImageData() {
      try {
        const { data } = await API.get('/api2/image/page/' + page);
        setImages(data.images);
        setCount(data.count);
        setLoading(false);
      } catch (error) {
        notification(error.message, 'Error', 'danger');
      }
    }

    getImageData();
  }, [page, loading, notification]);

  async function deleteImage(id) {
    setLoading(true);
    try {
      await API.delete('/api2/image/' + id);
    } catch (error) {
      notification(error.message, 'Error', 'danger');
    } finally {
      setLoading(false);
    }
  }

  // Edit image
  async function editImage(id, newData) {
    try {
      await API.put('/api2/image/' + id, newData);
      const { data } = await API.get('/api2/image/page/' + page);
      setImages(data.images);
      setCount(data.count);
      setLoading(true);
    } catch (error) {
      console.error(error);
      notification(error.message, 'Error', 'danger');
    } finally {
      setLoading(false);
    }
  }
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
      {images.map(el => (
        <Image
          key={el._id}
          el={el}
          deleteImage={deleteImage}
          editImage={editImage}
        />
      ))}
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
