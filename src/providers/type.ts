import { authProvider, userProvider } from '.';

export type TSingUp = typeof authProvider.signUp;
export type TSingIn = typeof authProvider.signIn;
export type TCreateUser = typeof userProvider.createUser;
