import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minWidth: '864px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
    marginBottom: 20,
  },
  wrapper: {
    width: '90%',
  },
  rangeMargin: {
    // marginRight: '80px',
    display: 'flex',
    alignItems: 'center',

    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'center',
    justifyContent: 'center',
  },
  marksWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  marks: {
    display: 'flex',
    width: '100%',
  },
  rangeWidth: {
    display: 'flex',
    justifyContent: 'center',
  },
  slider: {
    width: '625px',
    marginTop: 10,
  },
  hr: {
    backgroundColor: '#aaa',
    margin: '10px 0 20px 0',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column-reverse',
  },
}));

export default function CustomizedSlider({ range, setValue, name }) {
  const classes = useStyles();

  console.log('====================================');
  console.log('range -> ', range);
  console.log('====================================');

  const handleChange = (e, newValue) => {
    console.log('handle change -> ', newValue);
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.wrapper}>
        <Typography gutterBottom>{name}</Typography>

        <hr className={classes.hr} />

        {/* migrate this to a component */}
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

        <div className={classes.rangeWidth}>
          <Slider
            className={classes.slider}
            aria-label='tone/form'
            defaultValue={range}
            onChange={handleChange}
          />
        </div>

        <div className={classes.margin} />
      </div>
    </Paper>
  );
}
