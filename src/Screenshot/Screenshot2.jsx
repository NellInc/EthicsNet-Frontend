import React, { useState } from 'react';

function Screenshot2() {
  const [name, setName] = useState('lopes');

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Screenshot component</h1>

      <button onClick={() => setName('emerson')}>{name}</button>
    </div>
  );
}

export default Screenshot2;
