import React, { useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { apiURL } from '../globals';
import { Notification } from '../Store';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const notification = useContext(Notification);

  const { open, handleClose, content, id, filterAnotations, elId } = props;

  useEffect(() => {}, [id, props.open]);

  const handleDelete = async () => {
    try {
      const { token } = localStorage;

      const response = await fetch(`${apiURL}/api2/text/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        notification('Annotation deleted!');
        filterAnotations(id);
        handleClose();
      } else {
        notification(
          'There was a problem deleting the annotation',
          '',
          'danger'
        );
      }
    } catch (error) {
      console.error(error);
      notification('There was a problem deleting the annotation', '', 'danger');
    }
  };

  return (
    <div>
      <Dialog
        open={open && elId === id}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Are you sure you want to detele this anotation?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            "{content}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
