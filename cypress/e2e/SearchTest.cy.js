import {selectDate} from '../support/utils'
import {selectGuests} from '../support/utils'




describe('Home page load and navigatin check', () => {  
//=========================================================================================================================================================================

    it('should apply a filter and update results', () => {

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
        
        //selecting 4 adults , then 3 kids with ages 3,4 and 5 then slecting 2 rooms
        selectGuests( {adults : 4 , kids : 3 , kidAges : [3,4,5] , rooms : 2})

        //Click the search button.
        cy.get("button[type='submit']").click()

    
    })
})