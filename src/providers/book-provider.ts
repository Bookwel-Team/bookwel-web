import axios from 'axios';
import { TGetAllBookParams, bookApi, firebaseAuth } from '.';
import { emptyToUndefined } from '../common/utils';
import { TUploadBookParams } from './type';

export const bookProvider = {
  async getAll({ author, title, category }: TGetAllBookParams) {
    const { data } = await bookApi().getBooks(emptyToUndefined(author), emptyToUndefined(title), emptyToUndefined(category));
    return data;
  },
  async getOne(bookId: string) {
    const { data } = await bookApi().getBookById(bookId);
    return data;
  },
  async downloadBook(fileName: string, url: string) {
    const response = await axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
    });
    // get the file extension
    const contentType = response.headers['content-type'];
    const fileExtension = contentType ? contentType.split('/')[1] : '';
    // create a element to download the file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([response.data]));
    link.download = `${fileName}.${fileExtension}`;
    link.click();
    window.URL.revokeObjectURL(link.href);
  },
  async upload({ picture, book, category }: TUploadBookParams) {
    const token = await firebaseAuth.currentUser?.getIdToken(true);
    const form = new FormData();
    form.append('picture', picture);
    form.append('book', book);
    form.append('category', category);
    const response = await axios.post('https://book-api.preprod.hei.school/books', form, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
