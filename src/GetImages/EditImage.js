import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './style';

import RangeSlider from '../Slider';

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
  contentAction,
  toneForm,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [contentAction1, setContentAction] = useState(contentAction);
  const [toneForm1, setToneForm] = useState(toneForm);

  const [values, setValues] = useState({
    title,
    category,
    description,
  });

  React.useEffect(() => {
    console.log(contentAction1, toneForm1)
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDelete = async () => {
    setOpen(false);

    const data = {
      ...values,
      contentAction: contentAction1,
      toneForm: toneForm1
    }

    editImage(id, data);
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
        // keepMounted
        onClose={handleCloseCancel}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>Edit Image</DialogTitle>
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

          {/* <FormControl className={classes.formControl}>
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
          </FormControl> */}

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
