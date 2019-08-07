import React, { useState, useEffect } from 'react';

function Anotations() {
  const [anotations, setAnotations] = useState([]);
  const [loading, setLoading] = useState(true);

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

      console.log('anotations ->', loading, anotations);
    }

    getUserData();
  }, [loading]);

  const anotationsComponent = anotations.map(el => (
    <div key={el._id}>
      <p> {el.content} </p>
      <p> {el.createdAt.substring(0,10)} </p>
    </div>
  ));

  return (
    <div>
      <h1>anotations component!</h1>

      <div>{anotationsComponent}</div>
    </div>
  );
}

export default Anotations;
