import {selectDate} from '../helpers/DateSelect'
import {selectGuests} from '../helpers/SelectGuests'
import {searchCity} from '../helpers/CitySearch.js'
import { applyFilter } from '../helpers/ApplyFilter'
import { fillForm } from '../helpers/FillDetails'





describe('Flow testing', () => {  


    it('Test Booking Flow Until Payment Page', () => {

        cy.visit("/")

        
        searchCity("Paris")
        
        selectDate("2025-08-01")
        selectDate("2025-08-03")
        
        
        selectGuests( {adults : 4 , kids : 1 , kidAges : [3] , rooms : 2})


        cy.get("button[type='submit']").click()


        //choosing the first hotel
       

        cy.get("[data-testid='title-link']").eq(3).invoke('removeAttr', 'target').click();

        
       //selecting number of rooms
        cy.get("[data-testid='select-room-trigger']").first()
          .select("1")


        //clicking reserve
        cy.contains("I'll reserve").invoke('removeAttr', 'target').click({force : true})
          
        

        //filling the form
        fillForm()

        cy.origin("https://secure.booking.com" ,()=>{
            cy.contains(" Complete booking ").should("be.visible")
    })
    })
})