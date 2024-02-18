import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';
import { AuthProvider } from '../context/auth-context';

export const NeedAuth = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className='pt-16 w-screen h-[90vh]'>
        <Outlet />
      </div>
    </AuthProvider>
  );
};
