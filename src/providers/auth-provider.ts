import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from './config';
import { Configuration } from '@onitsiky/bookwel-typescript-client';

export const authProvider = {
  async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return user;
  },
  async signUp(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return user;
  },
  getAuthConf() {
    return new Configuration({ accessToken: firebaseAuth.currentUser?.getIdToken() });
  },
};
