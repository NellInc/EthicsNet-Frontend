import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './style';

function Info(props) {
  const classes = useStyles();

  const { values, handleChange } = props;

  return (
    <div className={classes.info}>
      <hr />
      <Typography variant="body1" gutterBottom>
        This information below is optional, however it would help us to better
        assure minimal bias to the dataset, and to create a map of different
        people's impressions of behavioural norms across a diverse range, to
        facilitate teaching cultural competence to AI.
      </Typography>

      <TextField
        id="country"
        label="Country"
        className={classes.textField}
        value={values.country}
        onChange={handleChange('country')}
        margin="normal"
        type="text"
      />

      <TextField
        id="state"
        label="State/Province"
        className={classes.textField}
        value={values.state}
        onChange={handleChange('state')}
        margin="normal"
        type="text"
      />

      <TextField
        id="political"
        label="Political view"
        className={classes.textField}
        value={values.political}
        onChange={handleChange('political')}
        margin="normal"
        type="text"
      />

      <TextField
        id="religious"
        label="Religious view"
        className={classes.textField}
        value={values.religious}
        onChange={handleChange('religious')}
        margin="normal"
        type="text"
      />

      <TextField
        id="earnings"
        label="Montly earnings"
        className={classes.textField}
        value={values.earnings}
        onChange={handleChange('earnings')}
        margin="normal"
        type="text"
      />

      <TextField
        id="ethnicity"
        label="Ethnicity"

        className={classes.textField}
        value={values.ethnicity}
        onChange={handleChange('ethnicity')}
        margin="normal"
        type="text"
      />

      <TextField
        id="sexualOrientation"
        label="Sexual orientation"
        className={classes.textField}
        value={values.sexualOrientation}
        onChange={handleChange('sexualOrientation')}
        margin="normal"
        type="text"
      />

      <TextField
        id="language"
        label="Native language"
        className={classes.textField}
        value={values.language}
        onChange={handleChange('language')}
        margin="normal"
        type="text"
      />

      <TextField
        id="education"
        label="Education level"
        className={classes.textField}
        value={values.education}
        onChange={handleChange('education')}
        margin="normal"
        type="text"
      />

      <TextField
        id="social"
        label="Social class"
        className={classes.textField}
        value={values.social}
        onChange={handleChange('social')}
        margin="normal"
        type="text"
      />

    </div>
  );
}

export default Info;
