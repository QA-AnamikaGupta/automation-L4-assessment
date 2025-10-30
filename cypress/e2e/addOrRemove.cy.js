import HomePage from "../pages/homePage";
import AddOrRemovePage from "../pages/addOrRemovePage";

describe('Verify dynamic table cases', () => {
    const baseUrl = Cypress.env('TEST_BASE_URL') || Cypress.config('baseUrl');
    beforeEach(() => {

        //Load fixture data
        cy.fixture('logindata').as('data');
        // Visit the base URL
        cy.visit('/');
        //Click on webinputs try it out button from homepage
        HomePage.ClickAddRemoveElementsTryItOutButton();
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Prevent Cypress from failing the test on uncaught exceptions
            return false;
        });
        cy.url().should('eq', baseUrl + 'add-remove-elements');
    });
    it('Verify drag and drop functionality', () => {
        AddOrRemovePage.ClickOnAddElementButton();
        AddOrRemovePage.AssertDeleteButton();
        AddOrRemovePage.ClickOnDeleteButton();
        AddOrRemovePage.AssertDeleteButtonAfter();
    })
});
