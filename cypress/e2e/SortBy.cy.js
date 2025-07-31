import {selectDate} from '../helpers/DateSelect'
import {selectGuests} from '../helpers/SelectGuests'
import {searchCity} from '../helpers/CitySearch.js'
import {assertPricesOrder} from '../helpers/AscendingPrices'




describe('Sort by functionality', () => {  


    it('Selecting lowest price and verifying prices start from lowest to highest', () => {

        cy.visit("/")

        
        searchCity("Paris")
        
        selectDate("2025-09-01")
        selectDate("2025-09-03")
        
        
        selectGuests( {adults : 4 , kids : 1 , kidAges : [3] , rooms : 2})


        cy.get("button[type='submit']").should("be.visible").click()

        //selecting lowest price filter
        cy.get("[data-testid='sorters-dropdown-trigger']").should("be.visible").click()
        cy.contains("[role='option']" , "highest first").should("be.visible").click()


        //asserting that prices are from highest to lowest
        assertPricesOrder("[data-testid='price-and-discounted-price']", "descending")
   
    })
    })
