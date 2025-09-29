class DynamicTablePaginationPage {
    elements = {
        rowLength: () => cy.get('select[name="example_length"]'),

    }
    VerifyRowLengthDropdown(){
        this.elements.rowLength()
        .should('be.visible')
        .and('have.length', '2');
    }
}
export default new DynamicTablePaginationPage();