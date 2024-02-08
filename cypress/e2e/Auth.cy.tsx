describe('Test Login', () => {
  it('Test login interface and validation', () => {
    const validEmail = 'john.doe@gmail.com';
    const validPassword = 'dummyPass';
    const differentPassword = 'dummyPass2';

    cy.visit('/auth/signin');

    cy.contains('Sign In');
    cy.nameCy('email').type('{enter}');

    cy.contains('Invalid email');
    cy.contains('Password should have seven (7) character at least.');

    cy.nameCy('email').type(`${validEmail}`);
    cy.typeCy('submit').click();

    cy.should('not.contain', 'Invalid email');
    cy.contains('Password should have seven (7) character at least.');

    cy.nameCy('password').type(validPassword);
    cy.should('not.contain', 'Password should have seven (7) character at least.');

    cy.contains('Create account ?').click();

    cy.contains('Sign Up');

    cy.nameCy('email').type('{enter}');

    cy.contains('Invalid email');
    cy.contains('Password should have seven (7) character at least.');

    cy.nameCy('email').type(`${validEmail}{enter}`);
    cy.nameCy('password').type(`${validPassword}{enter}`);
    cy.nameCy('confirmPassword').type(`${differentPassword}{enter}`);

    cy.contains('Passwords do not match. Please retry.');
    cy.nameCy('confirmPassword').clear().type(`${validPassword}`);

    cy.should('not.contain', 'Invalid email');
    cy.should('not.contain', 'Passwords do not match. Please retry.');
    cy.should('not.contain', 'Password should have seven (7) character at least.');

    cy.contains('Already have account ?').click();
    cy.contains('Sign In');
  });
});
