/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// // -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

import '@cypress/code-coverage/support';

export const dataCy = (name: string) => {
  return cy.get(`[data-cy='${name}']`);
};
export const nameCy = (name: string) => {
  return cy.get(`[name='${name}']`);
};

const typeCy = (name: string) => cy.get(`[type='${name}']`);

declare global {
  namespace Cypress {
    interface Chainable {
      nameCy: typeof nameCy;
      dataCy: typeof dataCy;
      typeCy: typeof typeCy;
    }
  }
}

Cypress.Commands.add('dataCy', dataCy);
Cypress.Commands.add('nameCy', nameCy);
Cypress.Commands.add('typeCy', typeCy);
