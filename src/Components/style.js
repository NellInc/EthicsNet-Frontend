import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: '20px 20px',
    '&:hover': {
      boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.4)',
      cursor: 'pointer',
    },
  },
  title: {
    textAlign: 'center',
  },
  loaderWrapper: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    background: '#282828',
    color: '#fff',
    padding: '4px',
    borderRadius: '5px',
    fontSize: '13px',
  },
  date: {
    fontSize: '12px',
  },
  font: {
    fontSize: '11px',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    margin: '20px auto',
    width: '625px'

  },
  hr: {
    backgroundColor: '#aaa',
    margin: '0 0 20px 0',
  },
  rangeMargin: {
    // marginRight: '80px',
    // display: 'flex',
    // alignItems: 'center',
    flexGrow: 1,
    flexBasis: 0,
    
  },
  marksWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  marks: {
    display: 'flex',
    width: '100%',
  },
  content: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 5
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column-reverse'
  }
}));
