// SessionContext.js
import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => { // <-- Corregir aquí
  const [numeroSolicitante, setNumeroSolicitante] = useState(null);

  return (
    <SessionContext.Provider value={{ numeroSolicitante, setNumeroSolicitante }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);


