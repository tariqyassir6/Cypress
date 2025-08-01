export function fillForm() {
  cy.origin("https://secure.booking.com", () => {

    cy.get("#user-details-heading", { timeout: 10000 })
      .should('exist')
      .should('be.visible');


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
          .type(value, { delay: 50 });
      }
    })
    })
    

    //Select country
    cy.get("[data-testid='user-details-cc1']", { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .select("France")

    

    //Click book button
    cy.get("[name='book']", { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true })

  })
}
