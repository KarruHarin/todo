import axios from "axios";
import React, { useState, useEffect } from "react";

const authContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export { AuthProvider, authContext };
