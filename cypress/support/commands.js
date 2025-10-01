// cypress/support/commands.js

Cypress.Commands.add('loginApi', () => {
  const apiBaseUrl = Cypress.env('apiBaseUrl') || Cypress.config('apiBaseUrl');

  // return the Cypress chain and yield the token
  return cy.fixture('apicredentials').then((data) => {
    const payload = { email: data.email || data.username, password: data.password };

    return cy.request({
      method: 'POST',
      url: `${apiBaseUrl}/users/login`,
      body: payload,
      failOnStatusCode: false
    }).then((resp) => {
      // token may be in resp.body.token or resp.body.data.token
      const token = resp.body && (resp.body.token || (resp.body.data && resp.body.data.token));

      if (resp.status >= 200 && resp.status < 400 && token) {
        // store in Cypress.env for convenience and also yield it
        Cypress.env('token', token);

        // optionally store user info
        const userData = resp.body && (resp.body.data || resp.body.user || null);
        if (userData) {
          Cypress.env('user', {
            id: userData.id || userData._id,
            name: userData.name,
            email: userData.email
          });
        }

        // yield the token to callers
        return cy.wrap(token);
      }

      throw new Error(
        `Login failed with status ${resp.status}.\nRequest payload: ${JSON.stringify(payload)}\nResponse body: ${JSON.stringify(resp.body)}`
      );
    });
  });
});
