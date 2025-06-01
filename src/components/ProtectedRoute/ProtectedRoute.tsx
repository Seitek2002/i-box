import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  const venue = localStorage.getItem('venue');
  return venue !== null;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/' replace />;
};

export default ProtectedRoute;