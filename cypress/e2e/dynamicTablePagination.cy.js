import HomePage from "../pages/homePage";
import DynamicTablePaginationPage from "../pages/dynamicTablePaginationPage";

describe('Verify dynamic table cases', () => {
    const baseUrl = Cypress.env('TEST_BASE_URL') || Cypress.config('baseUrl');
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


function checkAllPages() {
  cy.contains('Next').then(($btn) => {

    // 1️ First, process all rows on the current page
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).should('be.visible');
      cy.log($row.text());   // use cy.log for demonstration
    });

    // 2️ Now decide if we should go to the next page
    const isDisabled =
      $btn.attr('aria-disabled') === 'true' ||
      $btn.css('pointer-events') === 'none';

    if (!isDisabled) {
      // 3️ Button is enabled → click and recurse
      cy.wrap($btn).click();
      checkAllPages();   // recurse to handle next page
    } else {
      // 4️ Button is disabled → stop
      cy.log('Reached the last page — no more Next click');
    }
  });
}


    it('Verify pagination next and previous buttons functionality.', () => {
        checkAllPages()
    });
})