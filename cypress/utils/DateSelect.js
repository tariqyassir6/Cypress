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