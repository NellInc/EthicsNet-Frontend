import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { apiURL } from '../globals';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { open, handleClose, content, id, filterAnotations, elId } = props;

  useEffect(() => {
    console.log('dialog opened...', props.open);
    console.log('hello');
    console.log('id -> ', id);
  }, [id, props.open]);

  const handleDelete = async () => {
    try {
      const { token } = localStorage;

      const response = await fetch(
        `${apiURL}/api2/text/${id}`,
        {
          method: 'DELETE',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // TODO: show a message here if it was deleted successfully
      const data = await response.json();
      console.log(data);
      filterAnotations(id)
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog
        open={open && elId === id}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Are you sure you want to detele this anotation?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            "{content}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
