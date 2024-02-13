import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from './config';
import { Configuration } from '@onitsiky/bookwel-typescript-client';
import { cache } from '../common/utils';

export const authProvider = {
  async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
    cache.userFirebaseId(user.uid);
    return user;
  },
  async signUp(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    cache.userFirebaseId(user.uid);
    return user;
  },
  getAuthConf() {
    return new Configuration({ accessToken: firebaseAuth.currentUser?.getIdToken(true) });
  },
};
