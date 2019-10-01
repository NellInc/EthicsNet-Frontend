import React, { useState, useEffect } from 'react';

function Screenshot2() {
  const [name, setName] = useState('lopes');

  useEffect(() => {
    console.log('====================================');
    console.log('screenshot component');
    console.log('====================================');
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Screenshot component</h1>

      <button onClick={() => setName('emerson')}>{name}</button>
    </div>
  );
}

export default Screenshot2;
