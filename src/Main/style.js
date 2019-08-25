import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 'calc(100vh - 128px)',
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: '20px auto',
  },
  loaderWrapper: {
    height: 'calc(100vh - 98px)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));