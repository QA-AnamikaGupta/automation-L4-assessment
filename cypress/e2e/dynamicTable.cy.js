import HomePage from "../pages/homePage";

describe('Verify dynamic table cases', () => {
    const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');
    beforeEach(() => {

        //Load fixture data
        cy.fixture('logindata').as('data');
        // Visit the base URL
        cy.visit('/');
        //Click on webinputs try it out button from homepage
        HomePage.ClickDynamicTableTryItOutButton();
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Prevent Cypress from failing the test on uncaught exceptions
            return false;
        });
        cy.url().should('eq', baseUrl + 'dynamic-table');
    });

it('Find Chrome row and get CPU column value', () => {
  cy.get('table').should('be.visible');

  // Step 1: Find index of the "CPU" column in the header
  cy.get('table thead tr th').then($headers => {
    let cpuIndex = -1;
    $headers.each((i, header) => {
      if (Cypress.$(header).text().trim() === 'CPU') {
        cpuIndex = i; // save the index
      }
    });

    expect(cpuIndex).to.be.greaterThan(-1); // make sure CPU was found

    // Step 2: Loop rows in the tbody to find Chrome in first column
    cy.get('table tbody tr').each($row => {
      const firstColText = $row.find('td').eq(0).text().trim();

      if (firstColText === 'Chrome') {
        // Step 3: Get the cell from the same row at cpuIndex
        const cpuValue = $row.find('td').eq(cpuIndex).text().trim();
        cy.log(`Chrome row → CPU value: ${cpuValue}`);

        // Example assertion
        cy.get('#chrome-cpu').should('contain.text', cpuValue).then((expectvalue) =>{
            expectvalue.text() === cpuValue
        })
      }
    });
  });
});



});