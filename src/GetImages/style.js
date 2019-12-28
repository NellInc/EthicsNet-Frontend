import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  image: {
    marginBottom: '30px',
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
  },
  title: {
    textAlign: 'center',
  },
  description: {},
  font: {
    fontSize: '10px',
    marginBottom: 20,
  },
  img: {
    // width: '100%'
    width: '100%'
  },
  hr: {
    backgroundColor: '#ddd',
  },
  hr2: {
    backgroundColor: '#ddd',
    margin: '20px 0'
  },
  category: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 3,
    borderRadius: 4,
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
  },
  formControl: {
    margin: '15px 0',
  },
  editImage: {
    width: '99%',
    alignSelf: 'center',
  },
}));
