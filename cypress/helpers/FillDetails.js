export function fillForm() {
  cy.origin("https://secure.booking.com", () => {
    cy.get("#user-details-heading", { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .then(() => {
        const formFields = [
          { selector: "[data-testid='user-details-firstname']", value: "First" },
          { selector: "[data-testid='user-details-lastname']", value: "Last" },
          { selector: "[data-testid='user-details-email']", value: "firstlast@email.com" },
          { selector: "[data-testid='user-details-address1']", value: "City in a country" },
          { selector: "[data-testid='user-details-city']", value: "City" },
          { selector: "[data-testid='user-details-zip']", value: "123456" },
          { selector: "[data-testid='phone-number-input']", value: "666666666" }
        ];

        // ✅ Safely type in each field
        formFields.forEach(({ selector, value }) => {
          cy.get('body').then(($body) => {
            if ($body.find(selector).length > 0) {
              cy.get(selector, { timeout: 10000 })
                .should('be.visible')
                .should('be.enabled')
                .as('inputField');
              
              cy.get('@inputField').clear({ force: true });
              cy.get('@inputField').type(value); // ⬅️ no delay
            }
          });
        });

        // ✅ Select country safely
        cy.get('body').then(($body) => {
          if ($body.find("[data-testid='user-details-cc1']").length > 0) {
            cy.get("[data-testid='user-details-cc1']", { timeout: 10000 })
              .should('be.visible')
              .as('countrySelect');
            cy.get('@countrySelect').select("France");
          }
        });

        // ✅ Click the book button safely
        cy.get('body').then(($body) => {
          if ($body.find("[name='book']").length > 0) {
            cy.get("[name='book']", { timeout: 10000 })
              .should('be.visible')
              .as('bookButton');
            cy.get('@bookButton').scrollIntoView();
            cy.get('@bookButton').click({ force: true });
          }
        });
      });
  });
}
