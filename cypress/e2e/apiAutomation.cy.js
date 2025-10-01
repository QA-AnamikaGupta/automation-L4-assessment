describe('Verify Api Automation cases', () => {
       let token;
  beforeEach(() => {
    // return ensures Cypress waits for loginApi to finish
    return cy.loginApi()
      .then((t) => {
        token = t;
        Cypress.on('uncaught:exception', () => false);
      });
  });

  it('verify the get api and retrieve all notes', () => {
    const apiBaseUrl = Cypress.env('apiBaseUrl') || Cypress.config('apiBaseUrl');
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/notes`,
      headers: {
       'x-auth-token': token,
        failOnStatusCode: false
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
    });
  });

  it('Verify the retieve single note api', () => {
    const apiBaseUrl = Cypress.env('apiBaseUrl') || Cypress.config('apiBaseUrl');
    const noteId = '64298e2b6747aa02118d3c23'; // replace with a valid note ID

    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/notes/${noteId}`,
      headers: {
        'x-auth-token': token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('_id', noteId);
    });
  })
});
