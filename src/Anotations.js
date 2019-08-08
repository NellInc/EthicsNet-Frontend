import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    margin: '10px 20px',
    "&:hover": {
      backgroundColor: 'rgb(7, 177, 77, 0.1)',
      cursor: 'pointer'
    }
  },
  title: {
    textAlign: 'center'
  }
}));

function Anotations(props) {
  const classes = useStyles();

  const [anotations, setAnotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:5000/api/user/anotations',
        {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setAnotations(data.anotations);
      setLoading(false);

      console.log('anotations ->', loading, anotations);
    }

    getUserData();
  }, [loading]);

  const handleAnotationClick = (id, type) => {
    console.log('it was clicked!', props.history);
    console.log(id);

    type === 'edit' ? props.history.push(`/profile/anotations/edit/${id}`) : props.history.push(`/profile/anotations/delete/${id}`)
    
  }

  const anotationsComponent = anotations.map(el => (
    <Card className={classes.paper} key={el._id}>

      <div>

      </div>

      <p> {el.content} </p>
      <p> {el.createdAt.substring(0,10)} </p>


      <div>
        <Button color="primary" onClick={() => handleAnotationClick(el._id, 'edit')}>Edit</Button>

        <Button color="secondary" onClick={() => handleAnotationClick(el._id, 'delete')}>Edit</Button>

      </div>



    </Card>
  ));

  return (
    <div>
      <h3 className={classes.title} >Anotations</h3>

      <div>{anotationsComponent}</div>
    </div>
  );
}

export default Anotations;
