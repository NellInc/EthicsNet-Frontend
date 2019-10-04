import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  img: {
    // width: '100%'
  },
  title: {
    textAlign: 'center',
    marginBottom: 30
  },
  textField: {
    width: '100%',
  },
  hr: {
    backgroundColor: '#ddd',
  },
  typography: {
    textAlign: 'center',
  },
  submit: {
    marginTop: 20,
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alginItems: 'center',
  },
}));
