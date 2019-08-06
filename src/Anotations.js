import React, {useState, useEffect} from 'react';

function Anotations() {

  const [anotations, setAnotations] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/user/anotations', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const data = await response.json();

      setAnotations(data);
      setLoading(false);

      console.log('after fetch ->', loading, anotations);
    }

    getUserData();
    
  }, [loading])

  return (
    <div>
      <h1>anotations component!</h1>
    </div>
  )
}

export default Anotations;