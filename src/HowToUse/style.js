import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    marginTop: 20,
    color: '#999',
  },
  steps: {
    marginTop: 20,
    // color: '#999',
    color: theme.palette.primary.dark,
  },
  numbers: {
    fontSize: 16,
    color: theme.palette.primary.dark,
  },
  link: {
    color: '#1a0dab',
  },
  stepsImage: {
    width: '100%',
    marginTop: 10,
    marginBottom: 50
  },
  stepsComponent: {
    marginTop: 20,
  },
  hr: {
    backgroundColor: '#ddd',
    margin: '30px 0px'
  }
}));
