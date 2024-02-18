import { categoryList } from "./mock/category";

describe('Test Categories', () => {
  it('Test categories interface and validation', () => {
    cy.visit('/categories');
    cy.intercept('GET', '/categories', categoryList);
    cy.intercept('GET', '/categories/testId1/reaction', {});
    cy.intercept('GET', '/categories/testId2/reaction', {});

    cy.dataCy('nextButton').should('exist');

    const buttonCat1 = cy.contains(categoryList[0].name);

    cy.contains('What are your interests ?');
    cy.contains(categoryList[0].name);
    cy.contains(categoryList[1].name);

    cy.nameCy('categorySearch').type('{enter}');
    cy.nameCy('categorySearch').type(categoryList[0].name);

    //buttonCat1.should("have.class", "dark:hover:text-white")
    buttonCat1.click();
    buttonCat1.should('have.class', 'dark:hover:bg-neutral');

    cy.contains(categoryList[0].name);
    cy.should('not.contain.text', categoryList[1].name);

    cy.dataCy('nextButton').click();
  });
});
