import { CreateUser, User } from '@onitsiky/bookwel-typescript-client';
import { apiProvider } from '.';

export const userProvider = {
  createUser: async (createUser: CreateUser) => {
    const response = await apiProvider.userApi().createUser(createUser);
    return response.data as User;
  },
};
