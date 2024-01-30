import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from './config';

export const authProvider = {
  async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return user;
  },
};
