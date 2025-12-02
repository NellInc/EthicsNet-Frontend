import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  root: {
    color: 'rgb(50, 50, 50)',
  },
  title: {
    color: 'rgba(196, 196, 196)',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));