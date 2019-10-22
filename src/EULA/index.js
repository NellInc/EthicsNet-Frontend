// https://www.termsfeed.com/eula/b6470a865ca4a16b4025b524c8a13cc9

import React from 'react';
import Button from '@material-ui/core/Button';

// import { Container } from './styles';

export default function EULA(props) {
  return (
    <div style={{ height: '100vh', paddingBottom: 50 }}>
      <iframe
        width='100%'
        height='100%'
        title='privacy'
        src='https://www.termsfeed.com/eula/b6470a865ca4a16b4025b524c8a13cc9'
        frameborder='0'
      ></iframe>
      <Button
        style={{ marginTop: 15 }}
        type='button'
        color='primary'
        variant='outlined'
        // 
        onClick={() => props.history.push('/')}
      >
        Accept
      </Button>
    </div>
  );
}
