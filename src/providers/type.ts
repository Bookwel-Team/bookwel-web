import { authProvider, userProvider } from '.';
import { bookProvider } from './book-provider';
import { categoryProvider } from './category-provider';

export type TSingUp = typeof authProvider.signUp;
export type TSingIn = typeof authProvider.signIn;
export type TCreateUser = typeof userProvider.createUser;
export type TGetAllUser = typeof bookProvider.getAll;
export type TGetAllCategory = typeof categoryProvider.getAll;

export type TGetAllBookParams = {
  author?: string;
  category?: string;
};
