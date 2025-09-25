import { faker, fi, th } from '@faker-js/faker';
import WebInputPage from '../pages/webInputPage';
import HomePage from '../pages/homePage';

describe('Verify the Web input page cases', () => {
  const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');// Declare and assign outside
  const positiveNumberData = faker.number.int({ min: 1000, max: 9999 });
  const firstName = faker.person.firstName();
  const password = faker.internet.password();
  const date = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

  beforeEach(() => {
    //Laod fixture data
    cy.fixture('WebInputData').as('userData');

    // Visit the base URL
    cy.visit('/');
    //Click on webinputs try it out button from homepage
    HomePage.ClickWwebInputTryItOutButton();
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Prevent Cypress from failing the test on uncaught exceptions
      return false;
    });
    cy.url().should('eq', baseUrl + 'inputs');

  });

  /***
   * Test Case 1: Validate form field interactions with faker data
   * Test Case 2: Validate form field interactions with valid data from fixture file
   * Test Case 3: Validate form field interactions with invalid data from fixture file
   ***/
  it('Validate form field interactions with vaild data with faker data', () => {

    //webinputs page, input field interactions
    WebInputPage.InputNumberTextBox(positiveNumberData);
    WebInputPage.InputTextTextBox(firstName);
    WebInputPage.InputPasswordTextBox(password);
    WebInputPage.InputDateTextBox(date.toISOString().split('T')[0]);
    WebInputPage.ClickOnDisplayInputsButton();
    // Assert that the output fields are empty or contain appropriate error messages
    WebInputPage.AssertOutputNumber(positiveNumberData);
    WebInputPage.AssertOutputText(firstName);
    WebInputPage.AssertOutputPassword(password);
    WebInputPage.AssertOutputDate(date.toISOString().split('T')[0]);
    // Clear the input fields for the next iteration
    WebInputPage.ClickOnClearInputsButton();
  });

  it('Validate form field interactions with valid data from fixture', function () {
    // Load fixture data
    this.userData.positive.forEach(user => {
      //webinputs page, input field interactions
      WebInputPage.InputNumberTextBox(user.number);
      WebInputPage.InputTextTextBox(user.text);
      WebInputPage.InputPasswordTextBox(user.password);
      WebInputPage.InputDateTextBox(user.date);
      WebInputPage.ClickOnDisplayInputsButton();
      // Assert that the output fields are empty or contain appropriate error messages
      WebInputPage.AssertOutputNumber(user.number);
      WebInputPage.AssertOutputText(user.text);
      WebInputPage.AssertOutputPassword(user.password);
      WebInputPage.AssertOutputDate(user.date);
      // Clear the input fields for the next iteration
      WebInputPage.ClickOnClearInputsButton();
    })

  });

  it('Validate form field interactions with invalid data from fixture', function () {

    // Load fixture data
    this.userData.negative.forEach(user => {
      //webinputs page, input field interactions
      WebInputPage.InputNumberTextBox(user.number);
      WebInputPage.InputTextTextBox(user.text);
      WebInputPage.InputPasswordTextBox(user.password);
      WebInputPage.InputDateTextBox(user.date);
      WebInputPage.ClickOnDisplayInputsButton();
      // Assert that the output fields are empty or contain appropriate error messages
      WebInputPage.AssertOutputNumber(user.number);
      WebInputPage.AssertOutputText(user.text);
      WebInputPage.AssertOutputPassword(user.password);
      WebInputPage.AssertOutputDate(user.date);
      // Clear the input fields for the next iteration
      WebInputPage.ClickOnClearInputsButton();

    })
  });
});