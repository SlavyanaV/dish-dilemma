import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { UserType } from './userContextTypes';
import { auth } from '../config/firebase';

const initialState: UserType = {
  accessToken: '',
  email: '',
  _id: '',
};

export const UserContext = createContext({
  user: initialState,
});

type Props = {
  children: ReactNode;
};

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((firebaseUser: any) => {
      setUser({
        accessToken: firebaseUser?.accessToken || '',
        email: firebaseUser?.email || '',
        _id: firebaseUser?.uid || '',
      });
    });

    return subscriber;
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
