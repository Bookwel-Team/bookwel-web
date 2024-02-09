import { Book } from '@onitsiky/bookwel-typescript-client';
import { BookCardCover } from '../utilities/components';

describe('Test book card cover component', () => {
  it("Test show book's information", () => {
    cy.fixture('assets/book-one.pdf', 'base64').then(image => {
      const bookMock: Book = {
        author: 'Masashi Kishimoto',
        category: 'Manga',
        file_link: 'data:application/pdf;base64,' + image,
        file_name: 'book-one.pdf',
        id: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5',
        title: 'Naruto',
      };
      cy.mount(<BookCardCover book={bookMock} />);
    });
  });
});
