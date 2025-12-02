import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  img: {
    // width: '100%'
  },
  textField: {
    width: '100%',
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
