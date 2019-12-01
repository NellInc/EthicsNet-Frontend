import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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

      // TODO: show a message here if it was deleted successfully
      const data = await response.json();
      console.log(data);

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
