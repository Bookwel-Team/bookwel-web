describe('Test Login', () => {
  it('Test login interface and validation', () => {
    cy.visit('/auth/signin');

    cy.contains('Sign In');
    cy.nameCy('email').type('{enter}');

    cy.contains('Invalid email');
    cy.contains('Password should have seven (7) character at least.');

    cy.nameCy('email').type('john.doe@gmail.com{enter}');

    cy.should('not.contain', 'Invalid email');
    cy.contains('Password should have seven (7) character at least.');

    cy.nameCy('password').type('12345678');
    cy.should('not.contain', 'Password should have seven (7) character at least.');

    cy.contains('Create account ?').click();

    cy.contains('Sign Up');

    cy.nameCy('email').type('{enter}');

    cy.contains('Invalid email');
    cy.contains('Password should have seven (7) character at least.');
  });
});
