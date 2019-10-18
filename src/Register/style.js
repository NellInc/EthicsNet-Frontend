import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '47%',
  },
  submit: {
    marginTop: '20px',
  },
  headline: {
    marginTop: 20,
    padding: 20,
    border: '1px solid #ddd'
  }
}));