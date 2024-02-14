import { Whoami } from '@onitsiky/bookwel-typescript-client';

const USER_FIREBASE_ID = 'bookwel-user-firebase-id-item';
const USER_BACKEND_ID = 'bookwel-user-backend-id-item';
const WHOAMI = 'bookwel-whoami-item';

const setJSONItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    localStorage.setItem(key, JSON.stringify(null));
  }
};

const getJSONItem = (key: string) => {
  try {
    JSON.parse(localStorage.getItem(key) || '');
  } catch {
    return null;
  }
};

export const cache = {
  whoami(whoami: Whoami) {
    setJSONItem(WHOAMI, whoami);
  },
  userFirebaseId(id: string) {
    localStorage.setItem(USER_FIREBASE_ID, id);
  },
  userBackendId(id: string) {
    localStorage.setItem(USER_BACKEND_ID, id);
  },
};

export const getCached = {
  whoami() {
    return getJSONItem(WHOAMI);
  },
  userFirebaseId() {
    return localStorage.getItem(USER_FIREBASE_ID);
  },
  userBackendId() {
    return localStorage.getItem(USER_BACKEND_ID);
  },
};
