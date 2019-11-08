import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

import { useStyles } from './style';

export function Category({ categoryRangeContentAction, title }) {
  const classes = useStyles();

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
