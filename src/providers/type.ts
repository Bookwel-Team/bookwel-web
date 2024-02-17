import { authProvider, userProvider } from '.';
import { categoryProvider } from './category-provider';
import { reactionProvider } from './reaction-provider';
import { bookProvider } from './book-provider';

export type TSingUp = typeof authProvider.signUp;
export type TSingIn = typeof authProvider.signIn;
export type TWhoami = typeof userProvider.whoami;
export type TCreateUser = typeof userProvider.createUser;
export type TGetOneUser = typeof userProvider.getOne;
export type TUpdateOneUser = typeof userProvider.updateOne;
export type TCategory = typeof categoryProvider.getAll;
export type TReaction = typeof reactionProvider.reactToCategory;
export type TGetAllUser = typeof bookProvider.getAll;
export type TDownloadBook = typeof bookProvider.downloadBook;
export type TGetAllCategory = typeof categoryProvider.getAll;
export type TReactToBook = typeof reactionProvider.reactToBook;
export type TReactToCategory = typeof reactionProvider.reactToCategory;

export type TGetAllBookParams = {
  author?: string;
  category?: string;
};
