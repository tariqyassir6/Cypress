export function closePopup(selector, checkInterval = 1000) {
  function checkAndClick() {
    cy.get('body').then(($body) => {
      const element = $body.find(selector);

      if (element.length > 0 && element.is(':visible')) {
        cy.wrap(element).click({ force: true });
        
      } else {
        cy.wait(checkInterval).then(() => {
          checkAndClick()
        });
      }
    });
  }

  checkAndClick();
}
