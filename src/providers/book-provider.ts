import { apiProvider, TGetAllBookParams } from '.';

export const bookProvider = {
  async getAll({ author, category }: TGetAllBookParams) {
    const { data } = await apiProvider.bookApi().getBooks(author, category);
    return data;
  },
};
