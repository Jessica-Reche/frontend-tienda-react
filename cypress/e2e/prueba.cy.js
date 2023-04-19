
/* eslint-disable no-undef */
import '../support/commands';

require('cypress-xpath');

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login('shiva@admin.com', '123');
  });

  it('Title', () => {
    cy.contains('Bienvenido a Natural Cherry!');
  });
  
  it('Navbar', () => {
    const navbar = "//header";
    const tag = "header//a";
    const linksText = ['/', '/products','/checkout-page', '/signin', '/signup'];
    const logo ="//img[@alt='logo']";

    cy.xpath(navbar).should('exist');
    cy.xpath(logo).should('have.attr', 'src');
    cy.checkAndCompareLinks(linksText, tag);
  });

  it('Categorias', () => {
    const section = '[data-cy=category-test-section]';
    const images = '[data-cy=category-test-categories] img';
    const categories = ['tartas', 'cupcakes', 'donnuts', 'cookies'];
    const nextButton = "//div[@data-cy= 'category-test-section']//button[@aria-label='Next']";
    const tag = 'h4';
    const aditionalTag = '/..//button';
    const aditionalText= categories[3];

    cy.contains(`${section} h2`,'ategorías');
    cy.contains(`${section} h3`, 'Encuentra lo que buscas');
    cy.get(images).should('have.length', 4);
    cy.checkAndCompareText(categories, nextButton,aditionalText,tag,aditionalTag);
  });

  after(() => {
    cy.logout();

  });




});