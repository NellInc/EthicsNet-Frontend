// https://www.termsfeed.com/eula/b6470a865ca4a16b4025b524c8a13cc9

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function EULA() {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', paddingBottom: 50 }}>
      <iframe
        width='100%'
        height='100%'
        title='privacy'
        src='https://www.termsfeed.com/eula/b6470a865ca4a16b4025b524c8a13cc9'
        frameBorder='0'
      ></iframe>
      <Button
        style={{ marginTop: 15 }}
        type='button'
        color='primary'
        variant='outlined'
        onClick={() => navigate('/')}
      >
        Accept
      </Button>
    </div>
  );
}
