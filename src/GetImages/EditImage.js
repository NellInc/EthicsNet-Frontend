import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { useStyles } from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function EditImage({
  title,
  id,
  image,
  editImage,
  description,
  category,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
    title,
    category,
    description,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDelete = async () => {
    setOpen(false);
    editImage(id, values);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    console.log(title, id);
  }, [title, id]);

  return (
    <div>
      <Button
        style={{ marginLeft: 10 }}
        color='primary'
        variant='outlined'
        onClick={handleClickOpen}
      >
        Edit
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCancel}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
        // style={{ textAlign: 'center' }}
      >
        <DialogTitle id='alert-dialog-slide-title'>Edit Image</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id='image-title'
            label='Image title'
            // className={classes.textField}
            value={values.title}
            onChange={handleChange('title')}
            margin='normal'
            required
          />

          <TextField
            id='image-description'
            label='Image description'
            // className={classes.textField}
            multiline
            rows='4'
            value={values.description}
            onChange={handleChange('description')}
            margin='normal'
            required
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='category-simple'>Category</InputLabel>
            <Select
              required
              value={values.category}
              onChange={handleChange('category')}
              inputProps={{
                name: 'category',
                id: 'category-simple',
              }}
            >
              <MenuItem selected value='morally preferable'>
                Morally preferable
              </MenuItem>
              <MenuItem value='morally unpreferable'>
                Morally unpreferable
              </MenuItem>
              <MenuItem value='aesthetically preferable'>
                Aesthetically preferable
              </MenuItem>
              <MenuItem value='aesthetically unpreferable'>
                Aesthetically unpreferable
              </MenuItem>
              <MenuItem value='not unethical, but strange'>
                Not unethical, but strange
              </MenuItem>
            </Select>
          </FormControl>

          <img src={image} alt={title} className={classes.editImage} />
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={handleCloseCancel}
            color='default'
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            onClick={handleCloseDelete}
            color='secondary'
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
