import React, { useEffect, useState, useContext } from 'react';

import { apiURL } from '../globals';
import { Notification } from '../Store';
import { Loader } from '../components';

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
  }, [page, loading]);

  async function deleteImage(id) {
    setLoading(true);
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
      console.log(data);
      if (response.status === 200) {
        notification('Image annotation deleted!');
        setImages(images.filter(el => el._id !== id));
      } else {
        notification(
          'There was a problem deleting the image annotation',
          '',
          'danger'
        );
      }
    } catch (error) {
      console.error(error);
      notification(
        'There was a problem deleting the image annotation',
        '',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  }

  // Edit image
  async function editImage(id, newData) {
    setLoading(true);
    try {
      const { token } = localStorage;

      const response = await fetch(`${apiURL}/api2/image/${id}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      });

      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        notification('Image annotation updated!');
        // setImages(images.filter(el => el._id !== id));
      } else {
        notification(
          'There was a problem editing the image annotation',
          '',
          'danger'
        );
      }
    } catch (error) {
      console.error(error);
      notification(
        'There was a problem editing the image annotation',
        '',
        'danger'
      );
    } finally {
      setLoading(false);
    }
  }

  const imagesEl = images.map(el => (
    <Image
      key={el._id}
      el={el}
      deleteImage={deleteImage}
      editImage={editImage}
    />
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
