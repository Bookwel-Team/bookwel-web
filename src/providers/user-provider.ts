import { CreateUser } from '@onitsiky/bookwel-typescript-client';
import { securityApi, userApi } from '.';
import { cache, getCached } from '../common/utils';

export const userProvider = {
  async createUser(createUser: CreateUser) {
    const { data: user } = await userApi().createUser(createUser);
    cache.userBackendId(user.id || '');
    return user;
  },
  async whoami() {
    const { data: whoami } = await securityApi().whoami();
    cache.whoami(whoami);
    cache.userBackendId(whoami.user?.id || '');
    return whoami;
  },
  async getOne() {
    const usedId = getCached.userBackendId() || '';
    const { data } = await userApi().getUserById(usedId);
    return data;
  },
};
