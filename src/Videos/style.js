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
  }
}));