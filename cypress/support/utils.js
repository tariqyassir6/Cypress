
export function selectDate(date) {
        const [year, month, day] = date.split('-'); // "2025-06-25"
        const monthNames = [
             'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const monthName = monthNames[parseInt(month, 10) - 1]; // convert "06" to "June"

         // Open the calendar
         cy.get("[data-testid='searchbox-dates-container']").click()

         // Function to recursively navigate to the correct month
         function goToMonth() {
            cy.get("[aria-live='polite']").first().then(($header) => {
            if (!$header.text().includes(monthName)) {
            cy.get("[aria-label='Next month']").click()
            goToMonth() // Recurse until month is visible
             }
            })
            }

            goToMonth()

        // After reaching the correct month, select the day
        cy.get(`span[data-date="${date}"]`).click()
    }



//========================================================================================================================================
export function selectGuests({adults = 1  , kids = 0 , kidAges = [] , rooms = 1 }) {
    //clicking on the gests selector
    cy.get("[data-testid='occupancy-config']").click()

    //slecting the number of adults
    cy.get("[class='e32aa465fd']").eq(0).then(($adultCounter) => {
        const numOfAdults = parseInt($adultCounter.text())
        const difference = numOfAdults - adults
        if(difference > 0){
            for(let i=0 ; i<difference; i++){
                cy.get(':nth-child(1) > .e301a14002 > .c857f39cb2').click()
            }
        }else if(difference < 0){
            for(let i=0 ; i < -difference; i++){
                cy.get(':nth-child(1) > .e301a14002 > .dc8366caa6').click()
            }
        }
    })

    //slecting the number of kids
    cy.get("[class='e32aa465fd']").eq(1).then(($kidCounter) => {
        const numOfKids = parseInt($kidCounter.text())
        const difference = numOfKids - kids
        if(difference > 0){
            for(let i=0 ; i<difference; i++){
                cy.get(':nth-child(2) > .e301a14002 > .c857f39cb2').click()
            }
        }else if(difference < 0){
            for(let i=0 ; i < -difference; i++){
                cy.get(':nth-child(2) > .e301a14002 > .dc8366caa6').click()
            }
        }
    })
    if (kids > 0) {
        cy.get("[aria-label='Age of child at check-out']").should('have.length', kids).each(($dropdown, index) => {
        const age = kidAges[index] 
        cy.wrap($dropdown).select(`${age} years old`);
    });
}

//slecting the number of rooms
    cy.get("[class='e32aa465fd']").eq(2).then(($roomCounter) => {
        const numOfRooms = parseInt($roomCounter.text())
        const difference = numOfRooms - rooms
        if(difference > 0){
            for(let i=0 ; i<difference; i++){
                cy.get(':nth-child(5) > .e301a14002 > .c857f39cb2').click()
            }
        }else if(difference < 0){
            for(let i=0 ; i < -difference; i++){
                cy.get(':nth-child(5) > .e301a14002 > .aaf9b6e287').click()
            }
        }
    })


}