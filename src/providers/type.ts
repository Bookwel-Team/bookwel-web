import { authProvider, userProvider } from '.';
import { categoryProvider } from './category-provider';
import { reactionProvider } from './reaction-provider';

export type TSingUp = typeof authProvider.signUp;
export type TSingIn = typeof authProvider.signIn;
export type TCreateUser = typeof userProvider.createUser;
export type TCategory = typeof categoryProvider.getAll;
export type TReaction = typeof reactionProvider.reactCategory;
