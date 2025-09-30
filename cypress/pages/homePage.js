class HomePage{
    elements = {
        webInputTryItOutButton: () => cy.get('.card-footer a[href="/inputs"]'),
        testLoginPageTryItOutButton: () => cy.get('.card-footer a[href="/login"]'),
        testRegisterPageTryItOutButton: () => cy.get('.card-footer a[href="/register"]'),
        dynamicTableTryItOutButton: () => cy.get('.card-footer a[href="/dynamic-table"]'),
        dyanamicPaginationTryItOutButton: () => cy.get('.card-footer a[href="/dynamic-pagination-table"]'),
        dragAndDropTryItOutButton: () => cy.get('.card-footer a[href="/drag-and-drop"]'),
        addRemoveElementsTryItOutButton: () => cy.get('.card-footer a[href="/add-remove-elements"]'),
        notificationMessageTryItOutButton: () => cy.get('.card-footer a[href="/notification-message"]'),
        cypressSpiesStubAndClocksTryItOutButton: () => cy.get('.card-footer a[href="/cypress-spies-stubs-clocks"]'),
        dyanamicPaginationText:() => cy.contains('Dynamic Pagination Table'),
        apiTestingTryItOutButton: () => cy.get('.card-footer a[href="/notes/api/api-docs/"]'),

    }
    ClickWwebInputTryItOutButton(){
        this.elements.webInputTryItOutButton()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
    ClickTestLoginPageTryItOutButton(){
        this.elements.testLoginPageTryItOutButton()
        .scrollIntoView()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
    ClickTestRegisterPageTryItOutButton(){
        this.elements.testRegisterPageTryItOutButton()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
    ClickDynamicTableTryItOutButton(){
        this.elements.dynamicTableTryItOutButton()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
    ClickDyanamicPaginationTryItOutButton(){
        this.elements.dyanamicPaginationTryItOutButton()
        .scrollIntoView()
        .should('have.text', 'Try it out')
        .click();
    }
    ClickDragAndDropTryItOutButton(){
        this.elements.dragAndDropTryItOutButton()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
    ClickAddRemoveElementsTryItOutButton(){
        this.elements.addRemoveElementsTryItOutButton()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
    ClickNotificationMessageTryItOutButton(){
        this.elements.notificationMessageTryItOutButton()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
    ClickCypressSpiesStubAndClocksTryItOutButton(){
        this.elements.cypressSpiesStubAndClocksTryItOutButton()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
    ScrollintoVIewDynamicPaginationText(){
        this.elements.dyanamicPaginationText()
        .scrollIntoView()
        .should('be.visible');
    }
    ScrollintoViewLoginPage(){
        this.elements.testLoginPageTryItOutButton()
        .scrollIntoView()
        .should('be.visible')
    }
    ClickApiTestingTryItOutButton(){
        this.elements.apiTestingTryItOutButton()
        .scrollIntoView()
        .should('be.visible')
        .and('have.text', 'Try it out')
        .click();
    }
}
module.exports = new HomePage();