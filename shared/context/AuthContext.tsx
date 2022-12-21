import React, { createContext, useContext } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const authContext = createContext<any>(null);

const AuthContextProvider = ({ children }: Record<any ,JSX.Element>) => {
  const auth = useFirebaseAuth()

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);

export default AuthContextProvider;
