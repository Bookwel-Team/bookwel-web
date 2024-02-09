import { authProvider, userProvider } from '.';
import { categoryProvider } from './category-provider';
import { reactionProvider } from './reaction-provider';
import { bookProvider } from './book-provider';

export type TSingUp = typeof authProvider.signUp;
export type TSingIn = typeof authProvider.signIn;
export type TCreateUser = typeof userProvider.createUser;
export type TCategory = typeof categoryProvider.getAll;
export type TReaction = typeof reactionProvider.reactCategory;
export type TGetAllUser = typeof bookProvider.getAll;
export type TGetAllCategory = typeof categoryProvider.getAll;

export type TGetAllBookParams = {
  author?: string;
  category?: string;
};
