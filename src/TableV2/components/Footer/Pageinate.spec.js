let tabState;

describe('Pageinate', () => {
    it('visit app', () => {
        cy.visit('/')
        cy.window().its('__tableTab__').then(state => tabState = state);
    });

    it('Should display the proper number of pages based on data input', () => {
        console.log(tabState)
        cy.get('.page__container').children().should('have.length', 6);
    });

    it('First page displays first data in array', () => {
        expect(tabState.tableData[0][0]['OBJECTID']).equal(217);
        cy.get('.body__row').eq(0).contains(217)
    });
    it('Second page displays first data of second array when next page button is clicked', () => {
        expect(tabState.tableData[1][0]['OBJECTID']).equal(9373);
        cy.get('.body__row').eq(0).contains(217);
        cy.get('.page__arrow__right').click({ force: true });
        cy.get('.body__row').eq(0).should('not.contain', 217);
        cy.get('.body__row').eq(0).contains(9373);
    });
    it('First page displays first data of first array when back page button is clicked', () => {
        cy.get('.body__row').eq(0).contains(9373);
        cy.get('.page__arrow__left').click({ force: true });
        cy.get('.body__row').eq(0).should('not.contain', 9373);
        cy.get('.body__row').eq(0).contains(217);
    });

    it('The amount of pages changes if the table is filtered', () => {
        cy.get('#header-5').click();
        cy.get('.custom__header__options input').type('IN');
        cy.get('.page__container').children().should('have.length', 1);
    });
});