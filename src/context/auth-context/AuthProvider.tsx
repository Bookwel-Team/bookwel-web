import { FC, useState } from 'react';
import { TAuthProviderProps } from './types';
import { AuthContext } from './auth-context';
import { User } from 'firebase/auth';

export const AuthProvider: FC<TAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as any);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
