import { Configuration } from '@onitsiky/bookwel-typescript-client';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { cache, getCached } from '../common/utils';
import { firebaseAuth } from './config';

export const authProvider = {
  async signIn(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
    cache.userFirebaseId(user.uid);
    const idToken = await user.getIdToken();
    cache.idToken(idToken);
    return user;
  },
  async signUp(email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    cache.userFirebaseId(user.uid);
    return user;
  },
  getAuthConf() {
    return new Configuration({ accessToken: getCached.idToken() || '' });
  },
  logout() {
    localStorage.clear();
  },
};
