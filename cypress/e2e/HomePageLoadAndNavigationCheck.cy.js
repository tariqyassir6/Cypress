import {selectDate} from '../support/utils'



describe('Home page load and navigatin check', () => {  

//=========================================================================================================================================================================

    beforeEach('should apply a filter and update results', () => {

        cy.visit("https://www.booking.com/")

        //Type “Paris” in the destination field.
        cy.get("input[id=':rh:']").type("Paris")

        //close a sign in popup
        cy.wait(2000)
        cy.get('body').then($body => {
        const selector = '.b779265b5e > .e1e158e66b > .de576f5064';

        if ($body.find(selector).length > 0) {
            cy.get(selector).click();
        } else {
            cy.log('Popup not found, skipping close.');
         }
            });

        //Choose valid check-in and check-out dates.
        selectDate("2025-07-01")
        selectDate("2025-07-03")
        // cy.get("button[data-testid$='searchbox-dates-container']").click()
        // cy.get("span[aria-label='Fr 20 June 2025']").click()
        // cy.get("span[aria-label='Mo 23 June 2025']").click()

        //Click the search button.
        cy.get("button[type='submit']").click()

    
    })
//=========================================================================================================================================================================

     it('should search for hotels in Paris and display results', () => {
        
        //Assert that search results appear 
        cy.get("[data-testid='property-card']").should("be.visible")

        
        cy.get("[data-testid='property-card']")
          .its('length')
          .should('be.greaterThan', 1);

    })


//=========================================================================================================================================================================

    it.skip('should apply a filter and update results', () => {


        //Assert that search results appear 
        cy.get("[data-testid='property-card']").should("be.visible")

        //clicking a filter
        cy.get("[type='checkbox']").first().check()

        //Assert that results update
        cy.get("input[id=':rq:']").should("be.checked") //verifying if the box is checked
        cy.get('div[class="f6e3a11b0d a19a26a18c e95943ce9b"]').should("have.length" , 2)//verifying if the filter label appeared

    })


//=======================================================================================================================================================

     it.skip('should change language', () => {

        //clicking on the language options
        cy.get('[data-testid="header-language-picker-trigger"]').click()

        //choosing French
        cy.get("button[lang='fr']").should("be.visible")
        cy.get("button[lang='fr']").click()

        //verifying the langauge has changed
        cy.get('[data-testid="header-custom-action-button"]')
        .should("be.visible")
        .should("have.text" , "Ajouter mon établissement")
        
    })


//=====================================================================================================================================================
     it.skip('should change currency', () => {

        //clicking the currecy change 
        cy.get('[data-testid="header-currency-picker-trigger"]').click()

        //choosing Euro
        cy.contains('span.Picker_selection-text', 'Euro').should("be.visible")
        cy.contains('span.Picker_selection-text', 'Euro').click()

        //asserting the change of displayed currency
        cy.get('[data-testid="header-currency-picker-trigger"] > .ca2ca5203b')
        .should('be.visible')
        .should("contain" , "EUR")
     
    })


})