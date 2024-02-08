import { useContext } from 'react';
import { AuthContext } from './auth-context';

export const useAuth = () => {
  const { setUser, user } = useContext(AuthContext);

  return {
    setUser,
    ...user,
  };
};
