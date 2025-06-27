import {selectDate} from '../support/utils'
import {selectGuests} from '../support/utils'
import {searchCity} from '../support/utils'
import 'cypress-real-events/support'


describe('Search results', () => {  


    it('Results page loads', () => {

        cy.visit("https://www.booking.com/")

        //selecting the location
        searchCity("London")
        
        //selecting the date
        selectDate("2025-07-05")
        selectDate("2025-07-08")
        
        //selecting the ghests
        selectGuests( {adults : 2 , kids : 1 , kidAges : [3] , rooms : 2})

        //getting the search request
        cy.intercept('GET', '**/searchresults*').as('searchRequest')

        //click on the search button
        cy.get("button[type='submit']").click()


        //check if the body is not empty and the satus code is equal to 200

        cy.wait('@searchRequest').then((interception) => {
            expect(interception.response.body).to.not.be.empty
            expect(interception.response.statusCode).to.eq(200)
        })

        //verifying if the results have Paris in their adress
        cy.get("[data-testid='address']").contains("London")

        //choosing $250 on the min slider
        cy.get("[class='e7e72a1761']").first()
          .realMouseDown()
          .realMouseMove(20 , 0)
          .realMouseUp()

        //choosing $500 on the max slider
        cy.get("[class='fc835e65e6'][style='left: 100%;']").first()
          .realMouseDown()
          .realMouseMove(-200 , 0)
          .realMouseUp()
        
    })
})