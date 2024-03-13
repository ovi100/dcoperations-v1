import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';
import useGRN from '../hooks/useGRN';

export const AppContext = createContext({});

const AppProvider = ({children}) => {
  const authInfo = useAuth();
  const GRNInfo = useGRN();
  const contextValues = {
    authInfo,
    GRNInfo,
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
