export function searchCity(city) {

    cy.get("[data-testid='destination-container']").type(city)
    
    
    // cy.get('body').then($body => {
    //     const selector = '.b779265b5e > .e1e158e66b > .de576f5064';

    //     if ($body.find(selector).length > 0) {
    //         cy.get(selector).click();
    //     } else {
    //         cy.log('Popup not found, skipping close.');
    //      }
    //         })

}

