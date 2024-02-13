import { categoryApi } from '.';

export const categoryProvider = {
  async getAll(name?: string) {
    const { data } = await categoryApi().getAllCategories(name);
    return data;
  },
};
