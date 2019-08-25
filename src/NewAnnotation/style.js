import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
  textField: {
    width: '100%',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  loaderWrapper: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    width: '100%',
    marginBottom: '20px'
  }
}));