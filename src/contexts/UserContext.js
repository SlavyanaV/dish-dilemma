import { createContext, useEffect, useState } from 'react';

const initialState = {
  accessToken: '',
  email: '',
  _id: '',
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const accessToken = localStorage.getItem('accessToken');
  const email = localStorage.getItem('email');
  const _id = localStorage.getItem('_id');

  useEffect(() => {
    setUser({
      accessToken,
      email,
      _id,
    });
  }, [accessToken, email, _id]);

  const onLogin = (userData) => {
    setUser(userData);

    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('_id', userData._id);
  };

  const onLogout = () => {
    setUser(initialState);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </UserContext.Provider>
  );
};
