// cypress/support/commands.js

Cypress.Commands.add('loginApi', () => {
  // 1 Get the API base URL from cypress.config.js (under env)
  const apiBaseUrl = Cypress.env('apiBaseUrl');
  

  // // 2️ Read credentials from fixture file
  // return cy.fixture('apicredentials').then((data) => {
  //   const payload = {
  //     email: data.email || data.username,
  //     password: data.password
  //   };
  const payload = {
    username: Cypress.env('CYPRESS_API_USERNAME'),
    password: Cypress.env('CYPRESS_API_PASSWORD')
  };


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
