import { categoryList } from "./mock/category";

describe('Test Upload book', () => {
    it('Test upload book interface and validation', () => {
        cy.visit('/upload-book');
        cy.intercept('GET', '/categories', categoryList);
        cy.intercept('POST', '/books', {})

        cy.dataCy('input-picture').selectFile("cypress/fixtures/assets/picture.jpg")
        cy.dataCy('input-pdf').selectFile("cypress/fixtures/assets/book-one.pdf")
        cy.dataCy('autocomplete-show').click()
        cy.contains(categoryList[0].name).click()
        cy.dataCy('autocomplete-input').type("blablabla")
        cy.contains('No category found.')

        cy.dataCy('submit-book').click()
        cy.contains('Book added succesfully.')
    })
})