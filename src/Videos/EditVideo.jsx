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

export default function EditVideo({
  title,
  id,
  video,
  editVideo,
  contentAction,
  toneForm,
  description,
}) {
  // const { contentAction, toneForm } = video;

  const [open, setOpen] = useState(false);
  const [contentAction1, setContentAction] = useState(contentAction);
  const [toneForm1, setToneForm] = useState(toneForm);

  const [values, setValues] = useState({
    title,
    description,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseEdit = async () => {
    setOpen(false);

    setOpen(false);

    const data = {
      ...values,
      contentAction: contentAction1,
      toneForm: toneForm1,
    };

    editVideo(id, data);
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
        maxWidth='md'
        open={open}
        TransitionComponent={Transition}
        //keepMounted
        onClose={handleCloseCancel}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
        style={{ textAlign: 'center' }}
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Are you sure you want to delete this video?'}
        </DialogTitle>
        <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            id='image-title'
            label='Image title'
            value={values.title}
            onChange={handleChange('title')}
            margin='normal'
            required
          />

          <TextField
            id='image-description'
            label='Image description'
            multiline
            rows='4'
            value={values.description}
            onChange={handleChange('description')}
            margin='normal'
            required
          />

          <div>
            <RangeSlider
              range={contentAction1}
              setValue={setContentAction}
              name='Content/Action'
            />
            <RangeSlider
              range={toneForm1}
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
            onClick={handleCloseEdit}
            color='secondary'
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
