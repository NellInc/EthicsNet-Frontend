import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  paper: {
    background: 'red',
  },
  title: {
    textAlign: 'center',
  },
  hr: {
    backgroundColor: '#ddd',
    margin: '20px 0',
  },
  category: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 3,
    borderRadius: 4,
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    marginBottom: 40,
    border: '1px solid #ddd',
    padding: 25,
    borderRadius: 5,
  },
  buttons: {
    display: 'flex'
  }
}));
