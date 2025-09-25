class LoginPage {
    elements = {
        usernameTextbox: () => cy.get('input[name="username"]'),
        passwordTextbox: () => cy.get('input[name="password"]'),
        loginButton: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('#flash'),
        assertUsername: () => cy.get('#username'),
        assertLoginMessage: () => cy.get('#flash'),
        assertLoginWelcomeMessage: () => cy.get('.subheader'),
    }

    InputUsernameTextbox(username) {
        this.elements.usernameTextbox()
            .scrollIntoView()
            .clear()
            .type(username)
            .should('have.value', username);
    }

    InputPasswordTextbox(password) {
        this.elements.passwordTextbox()
            .scrollIntoView()
            .clear()
            .type(password)
            .should('have.value', password);
    }

    ClickLoginButton() {
        this.elements.loginButton()
            .scrollIntoView()
            .should('be.visible')
            .and('have.text', 'Login')
            .click();
    }

    AssertErrorMessage(expectedMessage) {
        this.elements.errorMessage()
            .should('be.visible')
            .then((text) => text.text().trimStart());
    }
    AssertUsername(expectedUsername) {
        this.elements.assertUsername()
            .should('be.visible')
            .then((text) => text.text().trimStart());
    }
    AssertLoginMessage(loginMessage) {
        this.elements.assertLoginMessage()
            .should('be.visible')
            .and('contain.text',loginMessage );
    }
    AssertLoginWelcomeMessage(welcomeMesage) {
        this.elements.assertLoginWelcomeMessage()
            .should('be.visible')
            .and('have.text', welcomeMesage);
    }

}

export default new LoginPage();