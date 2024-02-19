import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { AuthProvider } from '../context/auth-context';
import { useEffect } from 'react';
import { firebaseAuth } from '../../providers';
import { LOGIN_PAGE } from '../constants';
import { getCached } from '../utils';

export const NeedAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if (!user || !getCached.idToken()) {
        navigate(LOGIN_PAGE);
      }
    });
    return unsubscribe();
  }, []);
  return (
    <AuthProvider>
      <Navbar />
      <div className='pt-16 w-screen h-[90vh]'>
        <Outlet />
      </div>
    </AuthProvider>
  );
};
