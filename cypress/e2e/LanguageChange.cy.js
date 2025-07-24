import { changeLanguaeTo } from "../helpers/LanguageChanger"
import { assertLanguageChanged } from "../helpers/LanguageChanger"





describe('Language Change', () => {  


    it('Should change language', () => {

        cy.visit("/")
        
        changeLanguaeTo("Français")
        

        assertLanguageChanged("Français")
    })
})