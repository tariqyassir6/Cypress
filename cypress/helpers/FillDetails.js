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
    ]

    
    formFields.forEach(({ selector, value }) => {
      cy.get('body').then(($body) => {
        const element = $body.find(selector);
        if (element.length > 0 && element.is(':visible')) {
          cy.wrap(element).clear().type(value, { delay: 50 });
        } 
      })
    })

    
    cy.get('body').then(($body) => {
      const selectField = $body.find("[data-testid='user-details-cc1']");
      if (selectField.length > 0 && selectField.is(':visible')) {
        cy.wrap(selectField).select("France");
      } 
    })

    
    cy.get('body').then(($body) => {
      const button = $body.find("[name='book']");
      if (button.length > 0 && button.is(':visible')) {
        cy.wrap(button).click();
      } 
    })

  })
}
