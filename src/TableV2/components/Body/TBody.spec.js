describe('Options Cell', () => {
    it('Visit the app', () => {
        cy.visit('/');
    });
    it('Row should return to normal when discard button is clicked', () => {
        cy.get('.cell__options__actions').eq(2).click();
        cy.get('.cell__edit').children().should('be.visible').should('have.length', 20);
        cy.get('.cell__edit input').eq(2).clear().type('test');
        cy.get('.cell__options--discard').click();
        cy.get('.cell__edit').should('be.not.visible');
        cy.get('table').contains('td', 'test').should('be.not.visible');
    })
})