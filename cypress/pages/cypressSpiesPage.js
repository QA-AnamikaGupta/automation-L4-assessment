class CypressSpiesPage{
    elements ={
        likeButton: ()=> cy.get('button').contains('+ Like'),
        feedbackText: ()=> cy.get('[data-testid="feedback-text"]'),
        findMyLocationButton: ()=> cy.contains('button', 'Find My Location'),
        countryNameText: ()=> cy.get('#countryName > strong'),
        latitudeText: ()=> cy.get('#lat-value'),
        longitudeText: ()=> cy.get('#long-value'),
        discoverThisMethodButton: ()=> cy.contains('button', 'Discover This Method'),
    }
    ClickOnLikeButton()
    {
        this.elements.likeButton().click();
    }
    AssertTheFeedbackText()
    {
        this.elements.feedbackText().should('have.text', 'Thank you for your feedback!').and('be.visible');
    }
    ClickOnFindMyLocation()
    {
        this.elements.findMyLocationButton().click();
    }
    AssertCountryName(countryname)
    {
        this.elements.countryNameText().should('have.text', countryname);
    }
    AssertLatitude(latitude)
    {
        this.elements.latitudeText().should('have.text',latitude)
    }
    AssertLongitude(longitude)
    {
        this.elements.longitudeText().should('have.text',longitude)
    }
    ClickOnDiscoverThisMethodButton()
    {
        this.elements.discoverThisMethodButton().click()
    }

}
export default new CypressSpiesPage();