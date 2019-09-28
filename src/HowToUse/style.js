import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 20,
    color: '#999',
  },
  steps: {
    marginTop: 20,
    // color: '#999',
    color: theme.palette.primary.dark
  },
  numbers: {
    fontSize: 16,
    color: theme.palette.primary.dark
  },
  link: {
    color: '#1a0dab'
  }
}));
