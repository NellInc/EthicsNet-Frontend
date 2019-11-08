import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

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
    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'center',
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

        <div className={classes.marksWrapper}>
          <div className={classes.marks}>
            <span className={classes.rangeMargin}>Very dispreferable</span>
            <span className={classes.rangeMargin}>Not ok</span>
            <span className={classes.rangeMargin}>Neutral</span>
            <span className={classes.rangeMargin}>Ok</span>
            <span className={classes.rangeMargin}>Very preferable</span>
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
