import React from 'react';
import Button from '@material-ui/core/Button';

import { useStyles } from './style';

function Pagination({ handleNextPage, handlePreviousPage, page }) {
  const classes = useStyles();
  return (
    <div className={classes.pagination}>
      <Button
        color='primary'
        variant='outlined'
        style={{ marginRight: '10px' }}
        onClick={handlePreviousPage}
      >
        Previous Page
      </Button>

      <span>{page}</span>

      <Button
        color='primary'
        variant='outlined'
        style={{ marginLeft: '10px' }}
        onClick={handleNextPage}
      >
        Next Page
      </Button>
    </div>
  );
}

export default Pagination;