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
    fontSize: '13px'
  },
  date: {
    fontSize: '12px'
  },
  font: {
    fontSize: '11px'
  }
}));