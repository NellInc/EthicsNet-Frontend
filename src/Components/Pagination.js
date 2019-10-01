import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Pagination({ setPage, setLoading, page, count }) {
  const classes = useStyles();
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    setNumPages(Math.ceil(count / 5));
  }, [count]);

  function handleNextPage() {
    if (page * 5 < count) {
      setPage(page + 1);
      setLoading(true);
    }
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1);
      setLoading(true);
    }
  }

  function handleLastPage() {
    setPage(numPages);
    setLoading(true);
  }

  function handleFirstPage() {
    setPage(1);
    setLoading(true);
  }

  return (
    <div className={classes.pagination}>
      {page !== 1 && (
        <Fragment>
          <Button
            color='primary'
            variant='outlined'
            style={{ marginRight: '10px' }}
            onClick={handleFirstPage}
          >
            First Page
          </Button>

          <Button
            color='primary'
            variant='outlined'
            style={{ marginRight: '10px' }}
            onClick={handlePreviousPage}
          >
            Previous Page
          </Button>
        </Fragment>
      )}

      <span>
        {page} of {numPages}
      </span>

      {page !== numPages && (
        <Fragment>
          <Button
            color='primary'
            variant='outlined'
            style={{ marginLeft: '10px' }}
            onClick={handleNextPage}
          >
            Next Page
          </Button>
          <Button
            color='primary'
            variant='outlined'
            style={{ marginLeft: '10px' }}
            onClick={handleLastPage}
          >
            Last Page
          </Button>
        </Fragment>
      )}
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setLoading: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
