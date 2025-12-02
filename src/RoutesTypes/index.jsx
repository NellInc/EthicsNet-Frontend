import React from 'react';
import { Navigate } from 'react-router-dom';

import { apiURL } from '../globals';
import { Loader } from '../components';

export const PublicRoute = ({
  title,
  restricted,
  children,
}) => {
  if (title) {
    document.title = title;
  }

  // restricted = false meaning public route
  // restricted = true meaning restricted route
  if (localStorage.isLogged === 'true' && restricted) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export const PublicRouteRedirectHowtoUse = ({
  title,
  restricted,
  children,
}) => {
  if (title) {
    document.title = title;
  }

  // restricted = false meaning public route
  // restricted = true meaning restricted route
  if (localStorage.isLogged === 'true' && restricted) {
    return <Navigate to='/how-to-use' replace />;
  }

  return children;
};

export const PrivateRoute = ({ title, children }) => {
  if (title) {
    document.title = title;
  }

  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
  if (localStorage.getItem('isLogged') !== 'true') {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export const AdminRoutes = ({ title, children }) => {
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

    setIsAdmin(data.user.isAdmin);
    setLoading(false);
  }

  React.useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Show the component only when the user is admin
  // Otherwise, redirect the user to home page
  if (!isAdmin) {
    return <Navigate to='/' replace />;
  }

  return children;
};
