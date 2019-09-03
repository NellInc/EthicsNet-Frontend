import React, { useEffect, useState } from 'react';

import { apiURL } from '../globals';

function GetImages() {

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getImageData() {
      const token = localStorage.getItem('token');

      const response = await fetch(`${apiURL}/api/user/images`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Images fetched -> ', data.images);

      setImages(data.images);
      setLoading(false);
    }

    getImageData();
  }, [])

  const imagesEl = images.map(el =>(
    <div key={el._id} style={{border: '1px solid red', marginBottom: '20px'}}>
      <p>{el.title}</p>
      <img src={el.image} alt="" />
      <p>{el.description}</p>
    </div>
  ))

  return (
    <div>
      <h1>Images component!</h1>
      {imagesEl}
    </div>
  )
}

export default GetImages;