require('@4tw/cypress-drag-drop');

class DragAndDropPage {
    elements = {
        columnA: () => cy.get('#column-a'),
        columnB: () => cy.get('#column-b'),
    }

    columnA() {
        this.elements.columnA().trigger('mousedown', { which: 1 });
        this.elements.columnB().trigger('mousemove').trigger('mouseup', { force: true });
    }

    columnB() {
        this.elements.columnB().trigger('mousedown', { which: 1 });
        this.elements.columnA().trigger('mousemove').trigger('mouseup', { force: true });
    }
}
export default new DragAndDropPage();