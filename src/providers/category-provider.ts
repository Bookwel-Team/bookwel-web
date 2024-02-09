import { apiProvider } from '.';

export const categoryProvider = {
  async getAll(name?: string) {
    const { data } = await apiProvider.categoryApi.getAllCategories(name);
    return data;
  },
};
