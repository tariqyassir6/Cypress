import { selectDate } from '../helpers/DateSelect'
import { selectGuests } from '../helpers/SelectGuests'
import { searchCity } from '../helpers/CitySearch.js'
import { fillForm } from '../helpers/FillDetails'

describe('Flow testing', () => {  

    beforeEach(() => {
        Cypress.config('defaultCommandTimeout', 15000);
    });

    it('Test Booking Flow Until Payment Page', () => {

        
        cy.visit("/")

        
        searchCity("Paris")

        
        selectDate("2025-10-01")
        selectDate("2025-10-03")

        selectGuests({ adults: 4, kids: 1, kidAges: [3], rooms: 2 })

        
        cy.get("button[type='submit']").should("be.visible").click()

        

        //Choose hotel
        cy.get("[data-testid='title-link']", { timeout: 20000 })
            .eq(0)
            .invoke('removeAttr', 'target')
            .should('exist')
            .click({force: true})

        //click reserve
        cy.get("#hp_book_now_button").should("be.visible").click()

        //Select number of rooms
        cy.get("[data-testid='select-room-trigger']", { timeout: 15000 })
            .first()
            .should('be.visible')
            .select("1")

        //click I'll resereve
        
        cy.contains("I'll reserve").click({force: true})
        

        //Fill out booking form
       
        fillForm()

        //Confirm that "Complete booking" is visible
        cy.origin("https://secure.booking.com", () => {
            cy.contains(" Complete booking ", { timeout: 20000 })
                .should("be.visible")
        })
    })
})
