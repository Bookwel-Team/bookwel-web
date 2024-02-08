import { User } from 'firebase/auth';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type TAuthStore = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

export type TAuthProviderProps = {
  children: ReactNode;
};
