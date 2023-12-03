import { createContext, useState } from 'react';

const userID = createContext(null);

const MyContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    console.log('Token from context provider:', token);

    return (
      <userID.Provider value={{ token, setToken }}>
        {children}
      </userID.Provider>
    );
};
  
  export { userID, MyContextProvider };