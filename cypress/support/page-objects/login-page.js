import { closeLocationPopupIfAppears } from "../utils.cy";

export class LoginPage {
  navigate() {
    cy.visit(Cypress.env("baseUrl"));
    closeLocationPopupIfAppears();
    cy.get("nav[role] a[href*='signin']").click();
    closeLocationPopupIfAppears();
  }

  enterUsernamePassword(username, password) {
    cy.get("#signin--login").type(username);
    cy.get("#signin--password").type(password);
    return this;
  }

  uncheckRememberMeOption() {
    cy.get("#signin--remember_me").click();
    return this;
  }

  clickSubmitButton() {
    cy.get("input[type='submit']").click();
    return this;
  }

  verifyFirstNameIsDisplayed(firstName) {
    return cy.get(".homepage-heading__title").should("have.text", firstName);
  }

  verifyFullNameIsDisplayed(firstName, lastName) {
    cy.get("#header-dropdown-user_menu").click();
    return cy
      .get("div.header-dropdown--open")
      .get(".bdb-1")
      .should("have.text", firstName.concat(" ", lastName));
  }

  verifyErrorMessageIsDisplayed(failedLoginMessage) {
    return cy
      .get(".alert-box__content")
      .should("contain.text", failedLoginMessage);
  }

  verifyFailedLoginRedirectionUrl() {
    return cy.url().should("eq", Cypress.env("failedLoginRedirectionURL"));
  }
}
