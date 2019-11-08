import React from 'react';

import { useStyles } from './style';

function Admin() {
  const classes = useStyles();
  return (
    <div className={classes.admin}>
      <h1>this is the admin page!</h1>
    </div>
  );
}

export default Admin;
