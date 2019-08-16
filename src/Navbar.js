import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';

import { IsLogged } from './Store'
import { Loading } from './Store'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#fff',
    textDecoration: 'none'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const [loading, setLoading] = useContext(Loading)
  const [isLogged, setIsLogged] = useContext(IsLogged)

  useEffect(() => {
    async function fetchData() {}
    fetchData();
    setLoading(false);
  }, [loading]);

  const handleLogout = () => {
    props.history.push('/logged-out');
    // window.location.href = 'http://localhost:3000/#/logged-out';
    // setTimeout(() => {
    //   localStorage.isLogged = null;
    //   setIsLogged('false')
    // }, 200);
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
          {/* <Typography variant="h6" className={classes.title}>
            
          </Typography> */}
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
                <Link className={classes.link} to="/profile/anotations">
                  Anotations
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
