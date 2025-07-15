export function assertPricesAscending(selector) {
  cy.get(selector).each(($el, index, $list) => {
    if (index === 0) return; // skip first element

    const previousText = $list[index - 1].innerText 
    const currentText = $el.text()

    const previous = parseFloat(previousText.replace(/[^0-9.]/g, ''))
    const current = parseFloat(currentText.replace(/[^0-9.]/g, ''))

    expect(current, `Price at index ${index}`).to.be.gte(previous)
  })
}