/// <reference types="Cypress"/>
import data from "../fixtures/data.json";

let failedLoginMessage = "The password or email you entered is incorrect";

describe("the login page", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    try {
      cy.get(".fa.fa-close").click();
    } catch (error) {
      // nothing to do
    }
  });

  it("failed login", () => {
    cy.get("nav[role] a[href*='signin']").click();
    cy.get("#signin--login").type(data.incorrectEmail);
    cy.get("#signin--password").type(data.incorrectPassword);
    cy.get("#signin--remember_me").click();
    cy.get("input[type='submit']").click();
    cy.get(".alert-box__content").contains(failedLoginMessage);
  });

  it("successful login", () => {
    cy.get("nav[role] a[href*='signin']").click();
    cy.get("#signin--login").type(data.correctEmail);
    cy.get("#signin--password").type(data.correctPassword);
    cy.get("#signin--remember_me").click();
    cy.get("input[type='submit']").click();
    cy.get(".homepage-heading__title").contains(data.correctFirstName);
    cy.get("#header-dropdown-user_menu").click();
    cy.get("div.header-dropdown--open")
      .get(".bdb-1")
      .contains(data.correctFirstName + " " + data.correctLastName);
  });
});
