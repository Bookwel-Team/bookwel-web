import { AIApi, BookApi, CategoryApi, ReactionApi, SecurityApi, UsersApi } from '@onitsiky/bookwel-typescript-client';
import { authProvider } from '.';

export const aiApi = new AIApi(authProvider.getAuthConf());
export const bookApi = () => new BookApi(authProvider.getAuthConf());
export const userApi = () => new UsersApi(authProvider.getAuthConf());
export const categoryApi = () => new CategoryApi(authProvider.getAuthConf());
export const reactionApi = () => new ReactionApi(authProvider.getAuthConf());
export const securityApi = () => new SecurityApi(authProvider.getAuthConf());
