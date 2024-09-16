export const verifyExists = ({ element: locator }) => {
    cy.get(locator).should('exist');
};

export const clickAction = ({ locator: elementLocator }) => {
    cy.get(elementLocator).click({ multiple: true, force: true });
};

export const typeText = ({ locator: locatorBtn, dataText: txtData }) => {
    if (txtData) {
      //Check if txtData is not empty
      cy.get(locatorBtn).type(txtData);
    }
  };

export  const getText = ({ locator: locatorField }) => {
    let inputValue;
    cy.get(locatorField)
      .first()
      .then((input) => {
        inputValue = input.text();
        cy.log(inputValue);
        Cypress.env('inputValue', inputValue);
      });
    cy.log(Cypress.env('inputValue'));
    return Cypress.env('inputValue');
  };

export  const typeDropDwn = ({ locator: locatorField, drpDwnVal: value }) => {
    cy.get(locatorField)
      //.clear()
      .type(value)
      .wait(3000)
      .parent()
      .parent()
      .contains(value)
      .click({ force: true });
  };