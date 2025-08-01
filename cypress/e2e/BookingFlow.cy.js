import { selectDate } from '../helpers/DateSelect';
import { selectGuests } from '../helpers/SelectGuests';
import { searchCity } from '../helpers/CitySearch.js';
import { fillForm } from '../helpers/FillDetails';

describe('Flow testing', () => {  

    it('Test Booking Flow Until Payment Page', () => {

        cy.visit("/");

        // Search for city
        searchCity("Paris");
        
        // Select dates
        selectDate("2025-10-01");
        selectDate("2025-10-03");
        
        // Select guests
        selectGuests({ adults: 4, kids: 1, kidAges: [3], rooms: 2 });

        // Wait for search button and click
        cy.get("button[type='submit']")
          .should("exist")
          .should("be.visible")
          .click();

        // Choosing the first hotel
        cy.get("[data-testid='title-link']")
          .eq(3)
          .should("exist")
          .invoke('removeAttr', 'target')
          .click();

        // Selecting number of rooms
        cy.get("[data-testid='select-room-trigger']")
          .first()
          .should("be.visible")
          .select("1");

        // Clicking reserve button
        cy.contains("I'll reserve")
          .invoke('removeAttr', 'target')
          .click({ force: true });

        // Filling the form
        fillForm();

        // Verify page loaded correctly
        cy.origin("https://secure.booking.com", () => {
            cy.contains(" Complete booking ").should("be.visible");
        });
    });
});
