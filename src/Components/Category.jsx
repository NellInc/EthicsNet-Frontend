import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import { useStyles } from './style';

export function Category({ categoryRangeContentAction, title }) {
  const { classes } = useStyles();

  return (
    <>
      <p>{title}</p>

      <div className={classes.marksWrapper}>
        <div className={classes.marks}>
          <span className={classes.rangeMargin}>
            <div className={classes.iconWrapper}>
              <span>Very dispreferable</span>
              <SentimentVeryDissatisfiedIcon />
            </div>
          </span>
          <span className={classes.rangeMargin}>
            <div className={classes.iconWrapper}>
              <span>Not ok</span>
              <SentimentDissatisfiedIcon />
            </div>
          </span>
          <span className={classes.rangeMargin}>
            <div className={classes.iconWrapper}>
              <span>Neutral</span>
              <SentimentSatisfiedIcon />
            </div>
          </span>
          <span className={classes.rangeMargin}>
            <div className={classes.iconWrapper}>
              <span>Ok</span>
              <SentimentSatisfiedAltIcon />
            </div>
          </span>
          <span className={classes.rangeMargin}>
            <div className={classes.iconWrapper}>
              <span>Very preferable</span>
              <SentimentVerySatisfiedIcon />
            </div>
          </span>
        </div>
      </div>

      <LinearProgress
        className={classes.bar}
        variant='determinate'
        color='primary'
        value={categoryRangeContentAction}
      />
    </>
  );
}

export default Category;
