/* eslint-disable no-undef */

require('cypress-xpath');


Cypress.Commands.add('checkAndCompareText', (spectedText, aditionalButton, aditionalText = '', tag, aditionalTag = '') => {
  //header//a[contains(@href,'/')]
  const element = {
    XPATH: (text) => `//${tag}[contains(text(),'${text}')]${aditionalTag}`,
  };
  spectedText.forEach((text) => {
    if (text === aditionalText) {
      cy.xpath(aditionalButton).click();
    }
    cy.xpath(element.XPATH(text))
      .should('exist')
      .click()
      .url()
      .should('include', '/products')
      .go('back');
  });
});

Cypress.Commands.add('checkAndCompareLinks', (spectedLink, tag) => {

  const element = {
    XPATH: (link) => `//${tag}[@href='${link}']`,
  };
  spectedLink.forEach((link) => {

    if (link !== '/') {
      cy.xpath(element.XPATH(link))
        .eq(0)
        .should('exist')
        .click()
        .url()
        .should('include', link)
        .go('back');
    }
    else {
      cy.xpath(element.XPATH(link))
        .eq(0)
        .should('exist')
        .click()
        .url()
        .should('include', link)
        .go('back');
    }
  });
});

Cypress.Commands.add('typeTextArray', (textArray, input) => {
  textArray.forEach((text, index) => {
    cy.get(input[index]).type(text);
  });
});


Cypress.Commands.add('login', (email, password) => {
  const loginButton = "//header//a[@href='/signin']";
  const submit = '[data-cy=signin-submit ]';
  const textTotype = [email, password];
  const inputs = ['[data-cy=signin-email]', '[data-cy=signin-password]'];

  cy.xpath(loginButton).click();
  cy.typeTextArray(textTotype, inputs);
  cy.get(submit).click();
}
);

Cypress.Commands.add('logout', () => {
  const logoutButton = "//header//a[@href='/signin']";
  cy.xpath(logoutButton).click();
}
);



