export function applyFilter(filter) {
  cy.contains("[data-testid='filters-group-label-content']", filter)
    .should('be.visible')
    .click();
}