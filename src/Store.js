import React, { useState } from 'react';

// this is the default value
export const IsLogged = React.createContext(localStorage.isLogged)

function Store({ children }) {
  const [isLogged, setIsLogged] = useState(localStorage.isLogged);

  return (
    <IsLogged.Provider value={[isLogged, setIsLogged]}>
      {children}
    </IsLogged.Provider>
  );
}

export default Store;
