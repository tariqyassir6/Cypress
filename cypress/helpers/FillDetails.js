// export function fillForm(){
//    cy.origin("https://secure.booking.com" ,()=>{

//     cy.get("[data-testid='user-details-firstname']").type("First")

//     cy.get("[data-testid='user-details-lastname']").type("Last")

//     cy.get("[data-testid='user-details-email']").type("firstlast@email.com")

//     cy.get("[data-testid='user-details-address1']").type("City in a country")

//     cy.get("[data-testid='user-details-city']").type("City")

//     cy.get("[data-testid='user-details-zip']").type("123456")

//     cy.get("[data-testid='user-details-cc1']").select("France")

//     cy.get("[data-testid='phone-number-input']").type("666666666")

//     cy.get("[name='book']").click()
//    })
// }





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
          cy.wrap(element).type(value);
        } else {
          cy.log(`Skipping field: ${selector} (not visible)`);
        }
      });
    });

   cy.get("[data-testid='user-details-cc1']").select("France")

   cy.get("[name='book']").click()
    

  });
}