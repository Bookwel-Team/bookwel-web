import { Book, BookReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import { BookCardCover } from '../utilities/components';

describe('Test book card cover component', () => {
  it.only("Test show book's information for logged user", () => {
    const bookMock: Book = {
      author: 'Masashi Kishimoto',
      category: 'Manga',
      file_link: 'file',
      file_name: 'book-one.pdf',
      id: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5',
      title: 'Naruto',
    };

    cy.intercept('GET', '/books/1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5/reactions', [
      { reaction_status: ReactionStatus.LIKE, reactor_id: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5' },
    ] as BookReaction[]);

    cy.mount(<BookCardCover book={bookMock} userId='1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5' />);

    cy.contains('Naruto');
    cy.contains('Masashi Kishimoto');
    cy.contains('Manga');

    cy.dataCy('reaction-button').should('exist');

    cy.intercept('GET', '/books/1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5/reactions', [
      { reaction_status: ReactionStatus.UNSET, reactor_id: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5' },
    ] as BookReaction[]);

    cy.intercept('PUT', '/books/1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5/reaction', [
      { reaction_status: ReactionStatus.UNSET, reactor_id: '1a2b3c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5' },
    ] as BookReaction[]);

    cy.dataCy('reaction-button').click();
    cy.dataCy('download-button').click();
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
