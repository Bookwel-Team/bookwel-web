describe('Test Login', () => {
  it('Test login interface and validation', () => {
    cy.visit('/auth/signin');

    cy.contains('Sign In');
  });
});
