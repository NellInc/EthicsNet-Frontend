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
    // flex: '0 0 4fr',
    // justifyContent: 'space-between',
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
    margin: '10px 0 20px 0'
  }
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }

    console.log('====================================');
    console.log(value);
    console.log('====================================');
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef,
      }}
      open={open}
      enterTouchDelay={0}
      placement='top'
      // not to show the numbes on the tooltip
      title=''
    >
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.wrapper}>
          <Typography gutterBottom>Content/Action</Typography>

          <hr className={classes.hr}/>

          <div className={classes.marksWrapper}>
            <div className={classes.marks}>
              <span className={classes.rangeMargin} gutterBottom>
                Very dispreferable
              </span>
              <span className={classes.rangeMargin} gutterBottom>
                Not ok
              </span>
              <span className={classes.rangeMargin} gutterBottom>
                Neutral
              </span>
              <span className={classes.rangeMargin} gutterBottom>
                Ok
              </span>
              <span className={classes.rangeMargin} gutterBottom>
                Very preferable
              </span>
            </div>
          </div>

          <div className={classes.rangeWidth}>
            <Slider
              className={classes.slider}
              ValueLabelComponent={ValueLabelComponent}
              aria-label='custom thumb label'
              defaultValue={50}
            />
          </div>

          <div className={classes.margin} />
        </div>
      </Paper>


      <Paper className={classes.root}>
        <div className={classes.wrapper}>
          <Typography gutterBottom>Tone/Form</Typography>

          <hr className={classes.hr}/>

          <div className={classes.marksWrapper}>
            <div className={classes.marks}>
              <span className={classes.rangeMargin} gutterBottom>
                Very dispreferable
              </span>
              <span className={classes.rangeMargin} gutterBottom>
                Not ok
              </span>
              <span className={classes.rangeMargin} gutterBottom>
                Neutral
              </span>
              <span className={classes.rangeMargin} gutterBottom>
                Ok
              </span>
              <span className={classes.rangeMargin} gutterBottom>
                Very preferable
              </span>
            </div>
          </div>

          <div className={classes.rangeWidth}>
            <Slider
              className={classes.slider}
              ValueLabelComponent={ValueLabelComponent}
              aria-label='custom thumb label'
              defaultValue={50}
            />
          </div>

          <div className={classes.margin} />
        </div>
      </Paper>
    </>
  );
}
