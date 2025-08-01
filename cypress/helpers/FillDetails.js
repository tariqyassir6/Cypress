export function fillForm() {
  cy.origin("https://secure.booking.com", () => {

    const formFields = [
      { selector: "[data-testid='user-details-firstname']", value: "First" },
      { selector: "[data-testid='user-details-lastname']", value: "Last" },
      { selector: "[data-testid='user-details-email']", value: "firstlast@email.com" },
      { selector: "[data-testid='user-details-address1']", value: "City in a country" },
      { selector: "[data-testid='user-details-city']", value: "City" },
      { selector: "[data-testid='user-details-zip']", value: "123456" },
      { selector: "[data-testid='phone-number-input']", value: "666666666" }
    ];

    formFields.forEach(({ selector, value }) => {
      cy.get(selector, { timeout: 10000 })
        .should('exist')
        .should('be.visible')
        .then(() => {
          // Re-query to avoid stale element reference issues
          cy.get(selector).as('inputField');
          cy.get('@inputField').clear({ force: true });
          cy.get('@inputField').type(value, { delay: 50, force: true });
        });
    });

    // Handle dropdown
    cy.get("[data-testid='user-details-cc1']", { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .then(() => {
        cy.get("[data-testid='user-details-cc1']").select("France", { force: true });
      });

    // Click book button
    cy.get("[name='book']", { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .then(() => {
        cy.get("[name='book']").click({ force: true });
      });

  });
}
