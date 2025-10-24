/// <reference types="cypress" />
const { faker } = require("@faker-js/faker");
import { generateBookDetails } from '../utils/apiData';

describe('API Automation Tests', () => {

  before(() => {
      const bookDetails = generateBookDetails();
      Cypress.env('bookTitle', bookDetails.title);
      Cypress.env('bookDescription', bookDetails.description);
      Cypress.env('CYPRESS_API_USERNAME');
      Cypress.env('CYPRESS_API_PASSWORD');
  });

  beforeEach(() => {
    // login and set token
    cy.loginApi().then((token) => {
      expect(token).to.exist;
      cy.wrap(token).as('token');
    });
  });

  it('should fetch notes successfully', () => {
    cy.get('@token').then((token) => {
    expect(token).to.exist;
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/notes`,
      headers: {
        'x-auth-token': token
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('data').that.is.an('array');
    });
    });

  });

  it('should create a new note successfully', () => {

    cy.get('@token').then((token) => {
    const title = Cypress.env('bookTitle');
    const description = Cypress.env('bookDescription');
    expect(token).to.exist;

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/notes`,
      headers: {
        'x-auth-token': token
      },
      body: {
        title: title,
        description: description,
        category: 'Home'
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('data');
      expect(resp.body.data).to.include({ title: title });
      expect(resp.body.data).to.include({ description: description });
      expect(resp.body.data.id).to.exist;
      Cypress.env('createdNoteId', resp.body.data.id);
    });
    });
  });

  it('Verify Retrieve a note by its ID', () => {
    cy.get('@token').then((token) => {
    const noteId = Cypress.env('createdNoteId');
    const title = Cypress.env('bookTitle');
    expect(noteId).to.exist;
    cy.log('Note ID :', noteId);

    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/notes/${noteId}`,
      headers: {
        'x-auth-token': token
      },
      body: {
        id: noteId
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('data');
      expect(resp.body.data).to.include({ title: title});
    });
  });
  });

  it('should update the created note successfully', () => {
    cy.get('@token').then((token) => {
    const noteId = Cypress.env('createdNoteId');
    expect(noteId).to.exist;

    cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiBaseUrl')}/notes/${noteId}`,
      headers: {
        'x-auth-token': token
      },
      body: {
        id: noteId,
        title: 'Updated Note from API',
        description: 'This note was updated during API testing.',
        completed: true,
        category: 'Work'
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('data');
      expect(resp.body.data).to.include({ title: 'Updated Note from API', completed: true });
    });
  });
  });

  it('should delete the created note successfully', () => {
    cy.get('@token').then((token) => {
    const noteId = Cypress.env('createdNoteId');
    expect(noteId).to.exist;

    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiBaseUrl')}/notes/${noteId}`,
      headers: {
        'x-auth-token': token
      },
      body: {
        id: noteId
      }
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property('success', true);
      expect(resp.body).to.have.property('message', 'Note successfully deleted');
    });
  });
  });

});