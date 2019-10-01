import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './style';

function Image({el, deleteImage}) {
  const classes = useStyles();

  const {
    _id,
    title,
    image,
    imageFont,
    category,
    description,
  } = el;

  return (
    <div className={classes.image}>
      <p className={classes.title}>{title}</p>
      <hr className={classes.hr} />
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={image} alt='' />
      </div>

      <hr className={classes.hr} />
      <p className={classes.font}>
        Font: <a href={imageFont}>{imageFont}</a>
      </p>
      <p>
        <span className={classes.category}>{category}</span>
      </p>
      <p className={classes.description}>{description}</p>

      <Button
        color='secondary'
        variant='outlined'
        onClick={() => deleteImage(_id)}
      >
        Delete
      </Button>
    </div>
  );
}

export default Image;
