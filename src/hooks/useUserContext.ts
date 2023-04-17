import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useUserContext = () => {
  const user = useContext(UserContext);

  return user;
};
