import {selectDate} from '../helpers/DateSelect'
import {selectGuests} from '../helpers/SelectGuests'
import {searchCity} from '../helpers/CitySearch.js'
import { applyFilter } from '../helpers/ApplyFilter'





describe('Search results', () => {  


    it('Results page loads', () => {

        cy.visit("/")

        
        searchCity("Paris")
        
        selectDate("2025-08-01")
        selectDate("2025-08-03")
        
        
        selectGuests( {adults : 4 , kids : 1 , kidAges : [3] , rooms : 2})


        cy.get("button[type='submit']").click()


        applyFilter("Hotels")


        //checking if the filter appears and has Hotels label
        cy.get("[data-testid*='filter:ht_id']")
          .should("be.visible")
          .should("have.text" , "Hotels")

       
        
    })
})