import { createContext } from 'react';
import { TAuthStore } from './types';

export const AuthContext = createContext<TAuthStore>({ user: {} as any, setUser: () => {} });
