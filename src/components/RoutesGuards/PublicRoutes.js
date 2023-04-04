import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

export const PublicRoutes = () => {
  const {
    user: { accessToken },
  } = useUserContext();

  return accessToken ? <Navigate to="/my-profile" /> : <Outlet />;
};
