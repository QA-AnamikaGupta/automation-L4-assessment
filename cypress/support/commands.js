// cypress/support/commands.js

Cypress.Commands.add('loginApi', () => {
  // 1 Get the API base URL from cypress.config.js (under env)
  const apiBaseUrl = Cypress.env('TEST_API_URL');
  const email = Cypress.env('API_USERNAME');     // this is your email
  const password = Cypress.env('API_PASSWORD');

  // Guards + clean URL
  expect(apiBaseUrl, 'TEST_API_URL').to.be.a('string').and.match(/^https?:\/\//);
  expect(email, 'API_USERNAME (email)').to.be.a('string').and.not.be.empty;
  expect(password, 'API_PASSWORD').to.be.a('string').and.not.be.empty;
  
  const payload = { email, password };


  // 3 Send POST request to the login endpoint
  return cy.request({
    method: 'POST',
    url: `${apiBaseUrl}/users/login`,
    body: payload,
    failOnStatusCode: false // so Cypress won’t stop test automatically on 4xx/5xx
  }).then((resp) => {
    const token = resp.body?.token || resp.body?.data?.token;

    // 4️ Check if login was successful
    if (resp.status >= 200 && resp.status < 400 && token) {
      // store token in Cypress.env for later use
      Cypress.env('token', token);

      // return token so you can use it in tests
      return cy.wrap(token);
    }

    // 5️ If login failed, show clear error message
    throw new Error(`Login failed! 
        Status: ${resp.status}
        Response: ${JSON.stringify(resp.body)}
      `);
  });
});
//});
