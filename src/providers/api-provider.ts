import { BookApi, CategoryApi, ReactionApi, UsersApi } from '@onitsiky/bookwel-typescript-client';
import { authProvider } from '.';

export const apiProvider = {
  bookApi: new BookApi(authProvider.getAuthConf()),
  userApi: new UsersApi(authProvider.getAuthConf()),
  categoryApi: new CategoryApi(authProvider.getAuthConf()),
  reactionApi: new ReactionApi(authProvider.getAuthConf()),
};
