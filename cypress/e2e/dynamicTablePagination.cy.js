import HomePage from "../pages/homePage";
import DynamicTablePaginationPage from "../pages/dynamicTablePaginationPage";

describe('Verify dynamic table cases', () => {
    const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');
    beforeEach(() => {

        //Load fixture data
        cy.fixture('logindata').as('data');
        // Visit the base URL
        cy.visit('/');
        //Click on webinputs try it out button from homepage
        HomePage.ScrollintoViewLoginPage();
        HomePage.ScrollintoVIewDynamicPaginationText();
        HomePage.ClickDyanamicPaginationTryItOutButton();
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Prevent Cypress from failing the test on uncaught exceptions
            return false;
        });
        cy.url().should('eq', baseUrl + 'dynamic-pagination-table');
    });

    it('Verify by changing the row length to 10.', () => {

        DynamicTablePaginationPage.VerifyRowLengthDropdown('10');
        DynamicTablePaginationPage.AssertRowCount();
    })

    it('Verify by changing the row length to 5.', () => {
        DynamicTablePaginationPage.VerifyRowLengthDropdown('5');
        DynamicTablePaginationPage.AssertRowCount();
    });

    it('Verify by changing the row length to 3.', () => {
        DynamicTablePaginationPage.VerifyRowLengthDropdown('3');
        DynamicTablePaginationPage.AssertRowCount();
    });

    it('Verify by changing the row length to All.', () => {
        DynamicTablePaginationPage.VerifyRowLengthDropdown('All');
        DynamicTablePaginationPage.AssertRowCount();
    });

})