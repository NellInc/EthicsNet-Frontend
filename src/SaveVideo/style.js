import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
  title: {
    textAlign: 'center'
  },
  hr: {
    backgroundColor: '#ddd',
    margin: '50px 0'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  time: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '48%',
  },
  button: {
    marginTop: 25
  }
}));