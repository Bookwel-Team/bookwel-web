import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/auth-context';

export const NeedAuth = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
