import React from 'react'
import { Redirect, Route } from 'react-router-dom';


export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={props =>
        localStorage.isLogged === 'true' && restricted ? (
          <Redirect to="/profile" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('isLogged') === 'true' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};