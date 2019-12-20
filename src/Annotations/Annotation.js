import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import { useStyles } from './style';
import EditAnnotation from './EditAnnotation';
import Category from '../Components/Category';
import DeleteDialog from '../DeleteDialog';

function Annotation({
  handleClose,
  filterAnotations,
  idToDelete,
  el,
  handleAnotationClick,
  open,
  editAnnotation,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.paper}>
      <DeleteDialog
        content={el.content}
        open={open}
        handleClose={handleClose}
        id={idToDelete}
        elId={el._id}
        filterAnotations={filterAnotations}
      />

      <p>Annotation: </p>
      <p className={classes.content}>{el.content}</p>
      <hr className={classes.hr} />

      {/* Keep compatible with the extensions text annotation flow */}
      {el.category ? (
        <div className={classes.categoryWrapper}>
          <span className={classes.category}>{el.category}</span>
          <br />
        </div>
      ) : (
        <div>
          <Category
            title='Content/Action'
            categoryRangeContentAction={el.categoryRangeContentAction}
          />

          <Category
            title='Tone/Form'
            categoryRangeContentAction={el.categoryRangeToneForm}
          />

          <hr className={classes.hr} />
        </div>
      )}

      {el.font === 'none' || el.font === '' ? null : (
        <small className={classes.font}>
          Annotated from:{' '}
          <a target='_blank' rel='noopener noreferrer' href={el.font}>
            {el.font}
          </a>
        </small>
      )}

      <p className={classes.date}>{el.createdAt.substring(0, 10)} </p>

      <div className={classes.buttons}>
        <Button
          color='secondary'
          variant='outlined'
          onClick={() => handleAnotationClick(el._id, 'delete')}
        >
          Delete
        </Button>

        <EditAnnotation
          editAnnotation={editAnnotation}
          el={el}
          style={{ marginLeft: 10 }}
        />
      </div>
    </Card>
  );
}

export default Annotation;
