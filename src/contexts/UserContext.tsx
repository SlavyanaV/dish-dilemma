import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { UserType } from './userContextTypes';

const initialState: UserType = {
  accessToken: '',
  email: '',
  _id: '',
};

export const UserContext = createContext({
  user: initialState,
  onLogin: (userData: UserType) => {},
  onLogout: () => {},
});

type Props = {
  children: ReactNode;
};

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const accessToken = localStorage.getItem('accessToken');
  const email = localStorage.getItem('email');
  const _id = localStorage.getItem('_id');

  useEffect(() => {
    setUser({
      accessToken: accessToken as string,
      email: email as string,
      _id: _id as string,
    });
  }, [accessToken, email, _id]);

  const onLogin = (userData: UserType) => {
    setUser(userData);

    if (userData.accessToken && userData.email && userData._id) {
      localStorage.setItem('accessToken', userData.accessToken);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('_id', userData._id);
    }
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
