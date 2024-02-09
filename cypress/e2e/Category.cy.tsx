const category1 = {id: "testId1", name: "nameTest1"};
const category2 = {id: "testId2", name: "nameTest2"};

describe('Test Categories', () => {
    it('Test categories interface and validation', () => {
        cy.visit('/categories');
        cy.intercept('GET', '/categories', (request) => {
            request.reply([
                category1,
                category2
            ])
        })
        cy.intercept('GET', "/categories/testId1/creaction", (request)=> {
            request.reply({})
        })
        cy.intercept('GET', "/categories/testId2/creaction", (request)=> {
            request.reply({})
        })

        cy.dataCy('nextButton').should("exist")

        const buttonCat1 =  cy.contains(category1.name)

        cy.contains("What are your interests ?")
        cy.contains(category1.name)
        cy.contains(category2.name)

        cy.nameCy('categorySearch').type('{enter}');
        cy.nameCy('categorySearch').type(category1.name);

        //buttonCat1.should("have.class", "dark:hover:text-white")
        buttonCat1.click()
        buttonCat1.should("have.class", "dark:hover:bg-neutral")

        cy.contains(category1.name)
        cy.should('not.contain.text', category2.name)

        cy.dataCy('nextButton').click()
    })
})