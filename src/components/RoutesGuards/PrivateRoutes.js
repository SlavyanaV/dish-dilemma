import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

export const PrivateRoutes = () => {
  const {
    user: { accessToken },
  } = useUserContext();

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
