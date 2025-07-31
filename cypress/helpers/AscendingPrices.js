export function assertPricesOrder(selector, order) {
  cy.get(selector).each(($el, index, $list) => {
    if (index === 0) return;

    const previousText = $list[index - 1].innerText;
    const currentText = $el.text();

    const previous = parseFloat(previousText.replace(/[^0-9.]/g, ''));
    const current = parseFloat(currentText.replace(/[^0-9.]/g, ''));

    if (order === 'ascending') {
      expect(current, `Price at index ${index} should be >= previous`).to.be.gte(previous);
    } else if (order === 'descending') {
      expect(current, `Price at index ${index} should be <= previous`).to.be.lte(previous);
    } else {
      throw new Error(`Invalid order type: ${order}. Use 'ascending' or 'descending'`);
    }
  });
}
