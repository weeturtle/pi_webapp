import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedPage = () => {
  const {token} = useAuth();

  if (token) return <Outlet />;

  return <Navigate to="/login" />;

};

export default ProtectedPage;