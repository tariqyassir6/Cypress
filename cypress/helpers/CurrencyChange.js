export function changeCurrencyTo(currency) {
  //clicking the currecy change 
        cy.get('[data-testid="header-currency-picker-trigger"]').click()

        //choosing Euro
        cy.contains('span.Picker_selection-text', currency).should("be.visible")
        cy.contains('span.Picker_selection-text', currency).click()

        //asserting the change of displayed currency
        cy.get('[data-testid="header-currency-picker-trigger"] > .ca2ca5203b')
        .should('be.visible')
        .should("contain" , currency)
}