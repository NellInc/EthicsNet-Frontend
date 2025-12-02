import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function DeleteVideo({ title, id, video, deleteVideo }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDelete = async () => {
    setOpen(false);
    deleteVideo(id);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color='secondary' variant='outlined' onClick={handleClickOpen}>
        Delete
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCancel}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
        style={{ textAlign: 'center' }}
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Are you sure you want to delete this video?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {title}
          </DialogContentText>
          {/* <img src={image} alt={title} style={{ width: '90%' }} /> */}
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
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
