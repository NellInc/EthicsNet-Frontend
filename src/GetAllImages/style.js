import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  image: {
    marginBottom: '30px',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px'
  },
  title: {
    textAlign: 'center'
  },
  description: {},
  font: {
    fontSize: '10px'
  },
  img: {
    width: '100%'
  },
  hr: {
    backgroundColor: '#ddd'
  }
}));