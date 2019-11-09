import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { apiURL } from '../globals';
import { Loader } from '../components';

export const PublicRoute = ({
  title,
  component: Component,
  restricted,
  ...rest
}) => {
  console.log('**********');
  console.log(title);
  console.log(document.title);
  console.log('**********');
  if (title) {
    document.title = title;
  }

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={props =>
        localStorage.isLogged === 'true' && restricted ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export const PublicRouteRedirectHowtoUse = ({
  title,
  component: Component,
  restricted,
  ...rest
}) => {
  console.log('**********');
  console.log(title);
  console.log(document.title);
  console.log('**********');
  if (title) {
    document.title = title;
  }

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={props =>
        localStorage.isLogged === 'true' && restricted ? (
          <Redirect to='/how-to-use' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export const PrivateRoute = ({ title, component: Component, ...rest }) => {
  console.log('**********');
  console.log(title);
  console.log(document.title);
  console.log('**********');
  if (title) {
    document.title = title;
  }

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => {
        return localStorage.getItem('isLogged') === 'true' ? (
          <Component title={title} {...props} />
        ) : (
          <Redirect to='/login' />
        );
      }}
    />
  );
};

export const AdminRoutes = ({ title, component: Component, ...rest }) => {
  if (title) {
    document.title = title;
  }

  const [isAdmin, setIsAdmin] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  async function getUserData() {
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

    console.log('====================================');
    console.log('admin routes user data -> ', data.user);
    console.log('====================================');

    setIsAdmin(data.user.isAdmin);
    setLoading(false);
  }

  React.useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => {
        return isAdmin ? (
          <Component title={title} {...props} />
        ) : (
          <Redirect to='/' />
        );
      }}
    />
  );
};
