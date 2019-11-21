import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  footer: {
    border: '1px solid #000',
    textAlign: 'center',
    width: '100%',
    bottom: '1px',
    color: '#fff',
    background: theme.palette.primary.main,
    fontSize: 14,
    padding: '10px 0',
  },
  p: {
    margin: '12px 0',
  },
}));
