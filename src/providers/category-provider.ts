import { apiProvider } from '.';

export const categoryProvider = {
  getAll: async (name?: string) => {
    const response = await apiProvider.categoryApi.getAllCategories(name);
    return response.data;
  },
};
