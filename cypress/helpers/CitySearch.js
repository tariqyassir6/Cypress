export function searchCity(city) {

    cy.get("[data-testid='destination-container']")
      .should("be.visible")
      .type(city)
    
    
    

}

