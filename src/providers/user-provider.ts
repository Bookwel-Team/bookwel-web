import { CreateUser } from '@onitsiky/bookwel-typescript-client';
import { cache } from '../common/utils';
import { securityApi, userApi } from '.';

export const userProvider = {
  async createUser(createUser: CreateUser) {
    const { data: user } = await userApi().createUser(createUser);
    cache.userBackendId(user.id || '');
    return user;
  },
  async whoami() {
    const { data: whoami } = await securityApi().whoami();
    cache.whoami(whoami);
    return whoami;
  },
};
