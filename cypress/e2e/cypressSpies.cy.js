import HomePage from "../pages/homePage";
import CypressSpiesPage from "../pages/cypressSpiesPage";

describe('Verify cypress spies, stub api cases', () => {
    const baseUrl = Cypress.env('baseUrl') || Cypress.config('baseUrl');
    beforeEach(() => {

        //Load fixture data
        cy.fixture('logindata').as('data');
        // Visit the base URL
        cy.visit('/');
        cy.clearAllCookies();
        //Click on webinputs try it out button from homepage
        HomePage.ClickCypressSpiesStubAndClocksTryItOutButton();
        Cypress.on('uncaught:exception', (err, runnable) => {
            // Prevent Cypress from failing the test on uncaught exceptions
            return false;
        });
        cy.url().should('eq', baseUrl + 'spies-stubs-clocks');
    });
    it('should clicking Like buttoon, triggers gtag event and displays confirmation message', () => {
        cy.window().then((win) => {
            cy.spy(win.console, 'log').as('consoleLogSpy');
            if (!win.gtag) {
                win.gtag = function () { };
            }
            cy.spy(win, 'gtag').as('gtagSpy');
        });

        // Click the button to trigger the console.log and gtag calls
        CypressSpiesPage.ClickOnLikeButton();

        // Assert the expected message
       CypressSpiesPage.AssertTheFeedbackText();
        cy.get('@gtagSpy').should('have.been.called');
        cy.get('@gtagSpy').should('have.been.calledWith',
            'event',
            'like'
        );
    })

    it('should display correct location details for stubbed coordinates', () => {
        const fakePosition = {
            coords: {
                latitude: 48.8566,   // Paris, France
                longitude: 2.3522,
            },
        };


        cy.visit(baseUrl + 'spies-stubs-clocks', {
            onBeforeLoad(win) {
                // Ensure geolocation exists
                if (!win.navigator.geolocation) {
                    win.navigator.geolocation = {};
                }

                // Stub the getCurrentPosition method
                cy.stub(win.navigator.geolocation, 'getCurrentPosition')
                    .callsFake((successCallback) => {
                        successCallback(fakePosition);
                    });
            },
        });

        // Click the "Get Location" button
        CypressSpiesPage.ClickOnFindMyLocation();

        // Verify the displayed coordinates
        CypressSpiesPage.AssertCountryName('France');
        CypressSpiesPage.AssertLatitude('Latitude: 48.8566');
        CypressSpiesPage.AssertLongitude('Longitude: 2.3522')
    });

    it('should display all steps instantly using cy.clock and cy.tick', () => {

        //Freeze time 
        cy.clock();

        // Click the button the Discover this method button
        CypressSpiesPage.ClickOnDiscoverThisMethodButton()

        const steps = [
            '1. Ask a Question',
            '2. Do Background Research',
            '3. Construct a Hypothesis',
            '4. Test Your Hypothesis by Doing an Experiment',
            '5. Analyze Your Data and Draw a Conclusion',
            '6. Communicate Your Results'
        ];

        steps.forEach((step, idx) => {
            cy.tick(2000); // Advance the clock by 2 seconds per step
            cy.get(`[data-testid="step-${idx+1}"]`).should('have.text', step);
        });
    });


});