require('@4tw/cypress-drag-drop');

class DragAndDropPage {
    elements = {
        columnA: () => cy.get('#column-a'),
        columnB: () => cy.get('#column-b'),
        assertColumnA: () => cy.get('#column-b header'),
        assertColumnB: () => cy.get('#column-a header'),
    }

    ColumnA() {
        this.elements.columnA().drag('#column-b');
    }
    AssertColumnA() {
        this.elements.assertColumnA().should('have.text', 'A');
    }
    ColumnB() {
        this.elements.columnB().drag('#column-a');
    }
    AssertColumnB() {
        this.elements.assertColumnB().should('have.text', 'B');
    }

}
export default new DragAndDropPage();