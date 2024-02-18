describe('Test 404', () => {
    it('Test 404 page interface and validation', () => {
        cy.visit('/bad-path')
        cy.contains("404 ERROR")
        cy.contains("Chat book")
        cy.contains("Home Page")
    })
})