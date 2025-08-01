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

        formFields.forEach(({ selector, value }) => {
          cy.get('body').then(($body) => {
            if ($body.find(selector).length > 0) {
              cy.get(selector, { timeout: 10000 })
                .should('be.visible')
                .should('be.enabled')
                .clear({ force: true })
                .type(value);
            } else {
              cy.log(`Skipping field: ${selector} (not found)`);
            }
          });
        });

        cy.get('body').then(($body) => {
          const selectField = $body.find("[data-testid='user-details-cc1']");
          if (selectField.length > 0 && selectField.is(':visible')) {
            cy.wrap(selectField).select("France");
          } else {
            cy.log('Skipping country select (not found or not visible)');
          }
        });

        cy.get('body').then(($body) => {
          const button = $body.find("[name='book']");
          if (button.length > 0 && button.is(':visible')) {
            cy.wrap(button).scrollIntoView().click({ force: true });
          } else {
            cy.log('Skipping book button (not found or not visible)');
          }
        });
      });
  });
}
