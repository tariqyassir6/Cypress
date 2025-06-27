import {selectDate} from '../utils/DateSelect'
import {selectGuests} from '../utils/SelectGuests'
import {searchCity} from '../utils/CitySearch.js'






describe('Search results', () => {  


    it('Results page loads', () => {

        cy.visit("/")

        
        searchCity("Paris")
        
        selectDate("2025-07-01")
        selectDate("2025-07-03")
        
        
        selectGuests( {adults : 4 , kids : 3 , kidAges : [3,4,5] , rooms : 2})

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
        cy.get("[data-testid='address']").contains("Paris")
        
    })
})