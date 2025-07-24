export function changeLanguaeTo(language){
     
        cy.get('[data-testid="header-language-picker-trigger"]').click()

        cy.contains("[data-testid='selection-item']", language)
          .should('be.visible')
          .click()

}



const languageTexts = {
  'Français': {
    short: 'fr',
    title: 'Trouvez votre prochain séjour',
    searchButton: 'Rechercher',
    footerText: 'À propos de nous'
  },
  'English': {
    short: 'en-gb',
    title: 'Find your next stay',
    searchButton: 'Search',
    footerText: 'About us'
  }
  
}


export function assertLanguageChanged(language){

        const languageTexts = {
        'Français': {
            short: 'fr',
            title: 'Trouvez votre prochain séjour',
            searchButton: 'Rechercher',
            },

        'English': {
            short: 'en-gb',
            title: 'Find your next stay',
            searchButton: 'Search',
            }
        }


        
        const texts = languageTexts[language]

        //verify the title changed
        cy.get("[data-testid='herobanner-title1']")
          .should('contain', texts.title)

        //verify html has the changed language attribute
        cy.get('html').should('have.attr', 'lang', texts.short)

        //verify the search button language changed
        cy.get("button[type='submit']")
          .should('contain', texts.searchButton)


}

