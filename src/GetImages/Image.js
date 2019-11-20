import React from 'react';

import { useStyles } from './style';
import DeleteImage from './DeleteImage';
import EditImage from './EditImage';
import Category from '../Components/Category';

function Image({ el, deleteImage, editImage }) {
  const classes = useStyles();

  const {
    _id,
    title,
    image,
    imageFont,
    category,
    description,
    contentAction,
    toneForm,
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

      <p className={classes.description}>{description}</p>

      {/* <p>
        <span className={classes.category}>{category}</span>
      </p> */}

      <hr className={classes.hr2} />

      <Category
        title='Content/Action'
        categoryRangeContentAction={contentAction}
      />

      <Category title='Tone/Form' categoryRangeContentAction={toneForm} />

      <hr className={classes.hr2} />

      <div className={classes.buttons}>
        <DeleteImage
          title={title}
          id={_id}
          image={image}
          deleteImage={deleteImage}
        />
        {/* <EditImage
          title={title}
          id={_id}
          image={image}
          editImage={editImage}
          category={category}
          description={description}
        /> */}
      </div>
    </div>
  );
}

export default Image;
