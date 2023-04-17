import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

export const PrivateRoutes: FC = () => {
  const {
    user: { accessToken },
  } = useUserContext();

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
