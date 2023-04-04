import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = () => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken ? <Navigate to="/my-profile" /> : <Outlet />;
};
