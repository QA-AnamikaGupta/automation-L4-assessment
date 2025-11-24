import RegisterPage from '../pages/registerPage';
import HomePage from '../pages/homePage';
import RegisterData from '../utils/registerData';

describe('Register Functionality', () => {
    const baseUrl = Cypress.env('TEST_BASE_URL') || Cypress.config('baseUrl');
    
    //genrate the faker data
    const fakerRegisterdata = RegisterData.fakerRegisterData();     

    beforeEach(() => {
        //Laod fixture data
            cy.fixture('WebInputData').as('userData');
        
            // Visit the base URL
            cy.visit('/');
            //Click on webinputs try it out button from homepage
            HomePage.ClickTestRegisterPageTryItOutButton();
            Cypress.on('uncaught:exception', (err, runnable) => {
              // Prevent Cypress from failing the test on uncaught exceptions
              return false;
            });
            cy.clearAllCookies();
            cy.clearAllLocalStorage();
            cy.url().should('eq', baseUrl + 'register');        
    });

    it('verify register form with faker data', () => {

        RegisterPage.InputUsernameTextbox(fakerRegisterdata.username);
        RegisterPage.InputPasswordTextbox(fakerRegisterdata.password);
        RegisterPage.InputConfirmPasswordTextbox(fakerRegisterdata.confirmPassword);
        RegisterPage.ClickRegisterButton();
        RegisterPage.AssertSuccessMessage('Successfully registered, you can log in now.');    
    })

    it('Verify register form with existing user', () => {
        RegisterPage.InputUsernameTextbox('testuser');
        RegisterPage.InputPasswordTextbox('Password@123');
        RegisterPage.InputConfirmPasswordTextbox('Password@123');
        RegisterPage.ClickRegisterButton();
        RegisterPage.AssertErrorMessage('An error occurred during registration. Please try again.')
    });
    it('Verify register form with mismatched passwords', () => {
        RegisterPage.InputUsernameTextbox('testuser');
        RegisterPage.InputPasswordTextbox('Password123!');
        RegisterPage.InputConfirmPasswordTextbox('Password@124');
        RegisterPage.ClickRegisterButton();
        RegisterPage.AssertErrorMessage('Passwords do not match');
    });
});