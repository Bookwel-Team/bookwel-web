import { mockChatbotResponse } from './mock/chatbot-response';

describe('Chatbot Test', () => {
  it('Test chatbot integration', () => {
    cy.intercept('POST', '/chats', mockChatbotResponse).as('sendChatRequest');

    cy.visit('/chat');
    cy.contains('BookWel');
    cy.contains('Welcome to BookWel, your personalized book recommendation app!');
    cy.contains('Tired of wandering aimlessly in literary landscapes?');
    cy.contains('BookWel takes the guesswork out of finding your next captivating read.');
    cy.contains("Powered by intelligent algorithms and curated by bibliophiles like you, it's your own personal librarian in your pocket.");

    cy.nameCy('chatbot-input').type('mock request for e2e test');
    cy.dataCy('bot-btn').click();

    cy.wait('@sendChatRequest');

    cy.contains('You: mock request for e2e test');
    cy.contains('Here are some results for your query');

    cy.contains('The Fault in Our Stars');
    cy.contains('by John Green - Young Adult, Romance');

    cy.contains('Eleanor & Park');
    cy.contains('by Rainbow Rowell - Young Adult, Romance');
  });
});
