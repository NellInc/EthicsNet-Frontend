import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
    '@media (min-width:600px)': {},
  },
  textField: {
    width: '100%',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  button: {
    marginRight: '10px'
  },
  formControl: {
    width: '100%',
    marginBottom: '20px'
  }
}));