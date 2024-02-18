import { categoryApi } from '.';

export const categoryProvider = {
  async getAll(name?: string, userId?: string) {
    const { data } = await categoryApi().getAllCategories(name, userId);
    return data;
  },
};
