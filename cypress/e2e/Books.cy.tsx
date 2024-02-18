describe('books spec', () => {
  it('test books pages', () => {
    const validEmail = 'tepr.1@gmail.com';
    const validPassword = 'tepr123$';

    cy.visit('/auth/signin');

    cy.nameCy('email').type(`${validEmail}`);
    cy.nameCy('password').type(`${validPassword}{enter}`);

    cy.intercept('/whoami').as('whoami');
    cy.wait('@whoami');

    cy.intercept('/categories').as('categories');
    cy.intercept('/books').as('books');
    cy.wait('@categories');
    cy.wait('@books');

    cy.contains('BOOKWEL');
    cy.contains('Chatbot');
    cy.contains('Upload');

    cy.contains('Mystery');
    cy.contains('Thriller');
    cy.contains('Travel');

    cy.intercept('/books/f717a3c3-0e1f-41e3-b671-cb88aa215240').as('book1');
    cy.wait('@book1');

    cy.contains('The Woman in White');
    cy.contains('Horror');
    cy.contains('Wilkie Collins');

    cy.contains('When Totems Fall');
    cy.contains('Wayne C Stewart');
  });
});
