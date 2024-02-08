import { BookApi, UsersApi } from '@onitsiky/bookwel-typescript-client';
import { authProvider } from '.';

export const apiProvider = {
  bookApi: new BookApi(authProvider.getAuthConf()),
  userApi: new UsersApi(authProvider.getAuthConf()),
};
