import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

import RangeSlider from '../Slider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function EditAnnotation({ editAnnotation, el }) {
  const [open, setOpen] = React.useState(false);
  const {
    content,
    _id,
    categoryRangeContentAction,
    categoryRangeToneForm,
  } = el;

  const [contentAction, setContentAction] = useState(
    categoryRangeContentAction
  );
  const [toneForm, setToneForm] = useState(categoryRangeToneForm);

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
    setOpen(false);

    const data = {
      content: values.content,
      categoryRangeContentAction: contentAction,
      categoryRangeToneForm: toneForm,
    };

    editAnnotation(_id, data);
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
        maxWidth='md'
        TransitionComponent={Transition}
        // keepMounted
        onClose={handleCloseCancel}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>Edit Annotation</DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id='image-description'
            label='Text annotation content'
            multiline
            rows='4'
            value={values.content}
            onChange={handleChange('content')}
            margin='normal'
            required
          />
          <div>
            <RangeSlider
              range={categoryRangeContentAction}
              setValue={setContentAction}
              name='Content/Action'
            />
            <RangeSlider
              range={categoryRangeToneForm}
              setValue={setToneForm}
              name='Tone/Form'
            />
          </div>
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
