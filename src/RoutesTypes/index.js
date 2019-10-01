import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={props =>
        localStorage.isLogged === 'true' && restricted ? (
          <Redirect to="/" />
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
  console.log('**********')
  if (title) {
    document.title = title
  }
  
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => {

        // console.log('====================================');
        // console.log(title);
        // console.log('====================================');

        return (
        localStorage.getItem('isLogged') === 'true' ? (
          <Component title={title} {...props} />
        ) : (
          <Redirect to="/login" />
        )
        )
      }
      }
    />
  );
};
