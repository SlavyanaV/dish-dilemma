import { createContext, useState } from 'react';

const initialState = {
  accessToken: '',
  email: '',
  _id: '',
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const onLogin = (userData) => {
    setUser(userData);
  };

  const onLogout = () => {
    setUser(initialState);
  };

  return (
    <UserContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </UserContext.Provider>
  );
};
