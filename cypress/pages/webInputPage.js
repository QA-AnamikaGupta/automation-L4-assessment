class WebInputPage {
    elements = {
        numberTextBox: () => cy.get('input[name="input-number"]'),
        textTextBox: () => cy.get('input[name="input-text"]'),
        passwordTextBox: () => cy.get('input[name="input-password"]'),
        dateTextBox: () => cy.get('input[name="input-date"]'),
        displayInputsButton: () => cy.get('#btn-display-inputs'),
        outputNumber: () => cy.get('#output-number'),
        outputText: () => cy.get('#output-text'),
        outputPassword: () => cy.get('#output-password'),
        outputDate: () => cy.get('#output-date'),
        clearInputsButton: () => cy.get('#btn-clear-inputs'),
    }

    InputNumberTextBox(number) {
        this.elements.numberTextBox().
            clear()
            .type(number)
            .should('have.value', number);
    }

    InputTextTextBox(text) {
        this.elements.textTextBox()
            .clear()
            .type(text)
            .should('have.value', text);
    }

    InputPasswordTextBox(password) {
        this.elements.passwordTextBox().
            clear()
            .type(password).
            should('have.value', password);
    }

    InputDateTextBox(date) {
        this.elements.dateTextBox()
            .clear()
            .type(date)
            .should('have.value', date);
    }
    ClickOnDisplayInputsButton() {
        this.elements.displayInputsButton()
        .should('be.visible')
        .and('have.text', 'Display Inputs')
        .click();
    }
    AssertOutputNumber(expectedNumber) {
        this.elements.outputNumber()
            .should('be.visible')
            .and('have.text', `${expectedNumber}`);
    }
    AssertOutputText(expectedText) {
        this.elements.outputText()
            .should('be.visible')
            .and('have.text', `${expectedText}`);
    }
    AssertOutputPassword(expectedPassword) {
        this.elements.outputPassword()
            .should('be.visible')
            .and('have.text', `${expectedPassword}`);
    }
    AssertOutputDate(expectedDate) {
        this.elements.outputDate()
            .should('be.visible')
            .and('have.text', `${expectedDate}`);
    }
    ClickOnClearInputsButton() {
        this.elements.clearInputsButton()
            .should('be.visible')
            .and('have.text', 'Clear Inputs')
            .click();
    }
}
module.exports = new WebInputPage();