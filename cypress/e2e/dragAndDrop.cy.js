import HomePage from "../pages/homePage";
import DragAndDropPage from "../pages/dragAndDropPage";

describe('Verify dynamic table cases', () => {
    const baseUrl = Cypress.env('TEST_BASE_URL') || Cypress.config('baseUrl');
    beforeEach(() => {

        //Load fixture data
        cy.fixture('logindata').as('data');
        // Visit the base URL
        cy.visit('/');
        //Click on webinputs try it out button from homepage
        HomePage.ClickDragAndDropTryItOutButton();
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Prevent Cypress from failing the test on uncaught exceptions
            return false;
        });
        cy.url().should('eq', baseUrl + 'drag-and-drop');
    });

    it('Verify drag and drop functionality', () => {
        // Add your test steps here
        DragAndDropPage.columnA();
        cy.wait(7000);

    });

    it('Verify by navigating through multiple pages.', () => {
        DragAndDropPage.columnB();
        cy.wait(7000);
    })
});