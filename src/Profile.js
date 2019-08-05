import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  // container: {
  //   maxWidth: '700px',
  //   margin: 'auto',
  //   border: '1px solid #000',
  //   padding: '30px',
  //   borderRadius: '5px',
  // },
}));

function Profile(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/user', {
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

      setUserData(data.user);
      setLoading(false);

      console.log('after fetch ->', loading, userData);
    }
    getUserData();
  }, [loading]);

  return (
    <div className={classes.container}>
      <header>
        <p>Ethics eth - you're loged in!</p>
      </header>

      <main>
        <p>
          {userData.firstName} {userData.lastName}
        </p>
        <p>{userData.email}</p>
      </main>

      <Link to="/register">register</Link>
      <br />
      <Link to="/login">login</Link>
    </div>
  );
}

export default Profile;
