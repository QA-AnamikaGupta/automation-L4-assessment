class RegisterPage {
    elements = {
        usernameTextbox: () => cy.get('input[name="username"]'),
        passwordTextbox: () => cy.get('input[name="password"]'),
        confirmPasswordTextbox: () => cy.get('input[name="confirmPassword"]'),
        registerButton: () => cy.get('button[type="submit"]'),
        errorMssage : () => cy.get('#flash'),
        successMessage : () => cy.get('#flash'),
    }
    InputUsernameTextbox(username) {
        this.elements.usernameTextbox()
            .type(username)
            .should('have.value', username)
    }
    InputPasswordTextbox(password) {
        this.elements.passwordTextbox()
            .type(password)
            .should('have.value', password)
    }
    InputConfirmPasswordTextbox(confirmPassword) {
        this.elements.confirmPasswordTextbox()
            .type(confirmPassword)
            .should('have.value', confirmPassword)
    }
    ClickRegisterButton() {
        this.elements.registerButton()
            .should('be.visible')
            .click()
    }
    AssertErrorMessage(expectedMessage) {
        this.elements.errorMssage()
            .should('be.visible')
            .and('contain.text', expectedMessage);
    }
    AssertSuccessMessage(expectedMessage) {
        this.elements.successMessage()
            .should('be.visible')
            .and('contain.text', expectedMessage);
    }

}
export default new RegisterPage();  