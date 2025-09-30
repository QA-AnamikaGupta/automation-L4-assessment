class AddOrRemovePage {
  elements = {
    addElementButton : () => cy.get('[onclick="addElement()"]'),
    deleteButton : () => cy.get('.added-manually'),
  }

  ClickOnAddElementButton(){
    Cypress._.times(5, () => {
    this.elements.addElementButton().click();
    })
  }
  AssertDeleteButton()
  {
    this.elements.deleteButton().should('have.length',5);
  }
  ClickOnDeleteButton(){
    this.elements.deleteButton().eq(0).click();
  }
    AssertDeleteButtonAfter()
  {
    this.elements.deleteButton().should('have.length.lessThan',5);
  }
}
export default new AddOrRemovePage();