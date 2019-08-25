import React, { useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link, withRouter } from 'react-router-dom';

import { Loading } from '../Store';
import { useStyles } from './style';

function Navbar(props) {
  const classes = useStyles();

  const [loading, setLoading] = useContext(Loading);

  useEffect(() => {
    async function fetchData() {}
    fetchData();
    setLoading(false);
  }, [loading, setLoading]);

  const handleLogout = () => {
    props.history.push('/logged-out');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Link color="inherit" className={classes.title} to="/">
            Home
          </Link>

          {localStorage.isLogged === 'true' ? (
            <>
              <Button color="inherit">
                <Link className={classes.link} to="/profile">
                  Profile
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes.link} to="/profile/annotations">
                  Annotations
                </Link>
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link className={classes.link} to="/login">
                  Log in
                </Link>
              </Button>

              <Button color="inherit">
                <Link className={classes.link} to="/register">
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
