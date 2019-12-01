import React, { useEffect, useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link, withRouter } from 'react-router-dom';

import { Loading } from '../Store';
import { apiURL } from '../globals';
import { useStyles } from './style';

function Navbar(props) {
  const classes = useStyles();

  const [isAdmin, setAdmin] = useState(false);
  const setLoading = useContext(Loading)[1];

  useEffect(() => {
    async function getUserData() {
      try {
        const { token } = localStorage;

        const response = await fetch(`${apiURL}/api2/user`, {
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
        setAdmin(data.user.isAdmin);
      } catch (error) {
        console.log('error on the navbar -> ', error);
      } finally {
        setLoading(false);
      }
    }
    if (localStorage.isLogged) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [setLoading]);

  const handleLogout = () => {
    props.history.push('/logged-out');
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Link color='inherit' className={classes.title} to='/'>
            Home
          </Link>

          {/* There's no distraction to mask what is real */}
          {isAdmin && localStorage.isLogged === 'true' && (
            <Button color='inherit'>
              <Link className={classes.link} to='/admin'>
                Admin
              </Link>
            </Button>
          )}

          {localStorage.isLogged === 'true' ? (
            <>
              <Button color='inherit'>
                <Link className={classes.link} to='/profile'>
                  Profile
                </Link>
              </Button>
              <Button color='inherit'>
                <Link className={classes.link} to='/profile/annotations'>
                  Text annotations
                </Link>
              </Button>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit'>
                <Link className={classes.link} to='/login'>
                  Log in
                </Link>
              </Button>

              <Button color='inherit'>
                <Link className={classes.link} to='/register'>
                  Register
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);
