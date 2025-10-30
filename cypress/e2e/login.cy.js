import HomePage from "../pages/homePage";
import LoginPage from "../pages/loginPage";

describe('Verify Login page cases', () => {
const baseUrl = Cypress.env('TEST_BASE_URL') || Cypress.config('baseUrl');
    beforeEach(() => {

        //Load fixture data
        cy.fixture('logindata').as('data');
        // Visit the base URL
        cy.visit('/');
        //Click on webinputs try it out button from homepage
        HomePage.ClickTestLoginPageTryItOutButton();
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Prevent Cypress from failing the test on uncaught exceptions
            return false;
        });
        cy.url().should('eq', baseUrl + 'login');
    });

    it('Verify Login with valid credentials', function () { 
        // Load fixture data
        this.data.positive.forEach(user => {
            LoginPage.InputUsernameTextbox(user.username);
            LoginPage.InputPasswordTextbox(user.password);
            LoginPage.ClickLoginButton();
            // Assert that the output fields are empty or contain appropriate error messages
            cy.url().should('eq', baseUrl + 'secure');
            // Clear the input fields for the next iteration
            LoginPage.AssertUsername(`Hi, ${user.username}!`);
            LoginPage.AssertLoginMessage('You logged into a secure area!');
            LoginPage.AssertLoginWelcomeMessage('Welcome to the Secure Area. When you are done click logout below.');
        });
    })

    it('Verify Login with invalid credentials', function () {
        // Load fixture data
        this.data.negative.forEach(user => {
            LoginPage.InputUsernameTextbox(user.username);
            LoginPage.InputPasswordTextbox(user.password);
            LoginPage.ClickLoginButton();
            // Assert that the output fields are empty or contain appropriate error messages
            LoginPage.AssertErrorMessage('Your password is invalid!');
            //cy.url().should('eq', baseUrl + 'login');
            // Clear the input fields for the next iteration
        });
    })

});