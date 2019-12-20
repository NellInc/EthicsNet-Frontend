import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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

export default function EditAnnotation({ content, editAnnotation, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
    content,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSave = async () => {
    // setOpen(false);
    editAnnotation(id, values);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

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
      >
        <DialogTitle id='alert-dialog-slide-title'>Edit Annotation</DialogTitle>
        <DialogContent
          style={{ display: 'flex', flexDirection: 'column', minWidth: 600 }}
        >
          <TextField
            id='image-description'
            label='Image description'
            multiline
            rows='4'
            value={values.content}
            onChange={handleChange('content')}
            margin='normal'
            required
          />
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
            onClick={handleCloseSave}
            color='secondary'
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
