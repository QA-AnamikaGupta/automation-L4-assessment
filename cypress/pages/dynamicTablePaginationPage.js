class DynamicTablePaginationPage {
    elements = {
        rowLength: () => cy.get('select[name="example_length"]'),
        countOfRows: () => cy.get('table tbody tr'),

    }
    VerifyRowLengthDropdown(value){
        this.elements.rowLength().select(value)
        .should('be.visible')
    }
    AssertRowCount(){
        this.elements.countOfRows().then(($rows) => {
            const rowCount = $rows.length;
            cy.log('Number of data rows: ' + rowCount);
        });
    }
}
export default new DynamicTablePaginationPage();