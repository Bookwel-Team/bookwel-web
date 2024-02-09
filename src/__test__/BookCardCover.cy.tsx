import { Book } from '@onitsiky/bookwel-typescript-client';
import { BookCardCover } from '../utilities/components';

describe('Test book card cover component', () => {
  it("Test show book's information for logged user", () => {
    const bookMock: Book = {
      author: 'Masashi Kishimoto',
      category: 'Manga',
      file_link: 'file',
      file_name: 'book-one.pdf',
      id: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5',
      title: 'Naruto',
    };

    cy.mount(<BookCardCover book={bookMock} />);

    cy.contains('Naruto');
    cy.contains('Masashi Kishimoto');
    cy.contains('Manga');

    cy.dataCy('reaction-button').should('exist');
  });

  it("Test show book's information for not logged user", () => {
    const bookMock: Book = {
      author: 'Masashi Kishimoto',
      category: 'Manga',
      file_link: 'file',
      file_name: 'book-one.pdf',
      id: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5',
      title: 'Naruto',
    };

    cy.mount(<BookCardCover book={bookMock} needReaction={false} />);

    cy.contains('Naruto');
    cy.contains('Masashi Kishimoto');
    cy.contains('Manga');

    cy.dataCy('reaction-button').should('not.exist');
  });
});
