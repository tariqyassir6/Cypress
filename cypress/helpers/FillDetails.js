export function fillForm(){
   cy.origin("https://secure.booking.com" ,()=>{
    cy.get("[data-testid='user-details-firstname']").type("First")
    cy.get("[data-testid='user-details-lastname']").type("Last")
    cy.get("[data-testid='user-details-email']").type("firstlast@email.com")
    // cy.get("[data-testid='user-details-address1']").type("City in a country")
    // cy.get("[data-testid='user-details-city']").type("City")
    // cy.get("[data-testid='user-details-zip']").type("123456")
    cy.get("[data-testid='user-details-cc1']").select("France")
    cy.get("[data-testid='phone-number-input']").type("666666666")
    cy.get("[name='book']").click()
   
    
   })
    
   
    


}