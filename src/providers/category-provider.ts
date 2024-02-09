import { apiProvider } from '.';

export const categoryProvider = {
  getAll: async (name?: string) => {
    console.log(apiProvider.categoryApi);

    const response = await apiProvider.categoryApi().getAllCategories(name);
    return response.data;
  },
};
