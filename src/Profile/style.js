import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  loaderWrapper: {
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
  },
  textField: {
    width: '410px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  info: {
    marginTop: '20px'
  },
  buttonsWrapper: {
    marginTop: '20px'
  }
}));
