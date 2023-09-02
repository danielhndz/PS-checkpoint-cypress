/// <reference types="Cypress"/>

import data from "../../fixtures/data.json";
import { closeLocationPopupIfAppears } from "../utils.cy";
// import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
// import { LoginPage } from "../support/page-objects/login-page";

// const loginPage = new LoginPage();
let failedLoginMessage = "The password or email you entered is incorrect";

describe("the login page", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    closeLocationPopupIfAppears();
  });

  it("failed login", () => {
    cy.get("nav[role] a[href*='signin']").click();
    closeLocationPopupIfAppears();
    cy.get("#signin--login").type(data.incorrectEmail);
    cy.get("#signin--password").type(data.incorrectPassword);
    cy.get("#signin--remember_me").click();
    cy.get("input[type='submit']").click();
    cy.get(".alert-box__content").should("contain.text", failedLoginMessage);
    cy.url().should("eq", Cypress.env("failedLoginRedirectionURL"));
  });

  it("successful login", () => {
    cy.get("nav[role] a[href*='signin']").click();
    cy.get("#signin--login").type(data.correctEmail);
    cy.get("#signin--password").type(data.correctPassword);
    cy.get("#signin--remember_me").click();
    cy.get("input[type='submit']").click();
    cy.get(".homepage-heading__title").should(
      "have.text",
      data.correctFirstName
    );
    cy.get("#header-dropdown-user_menu").click();
    cy.get("div.header-dropdown--open")
      .get(".bdb-1")
      .should(
        "have.text",
        data.correctFirstName.concat(" ", data.correctLastName)
      );
  });
});

// Given("the user is on the login page", () => {
//   loginPage.navigate();
// });

// When("the user enters valid credentials", () => {
//   loginPage.enterUsernamePassword(data.correctEmail, data.correctPassword);
// });

// And("unchecks remember me option", () => {
//   loginPage.uncheckRememberMeOption();
// });

// And("clicks on submit button", () => {
//   loginPage.clickSubmitButton();
// });

// Then("the user info should be displayed", () => {
//   loginPage.verifyFirstNameIsDisplayed(data.correctFirstName);
//   loginPage.verifyFullNameIsDisplayed(
//     data.correctFirstName,
//     data.correctLastName
//   );
// });

// When("the user enters invalid credentials", () => {
//   loginPage.enterUsernamePassword(data.incorrectEmail, data.incorrectPassword);
// });

// Then("the user is redirected", () => {
//   loginPage.verifyFailedLoginRedirectionUrl();
// });

// And("an error message should be displayed", () => {
//   loginPage.verifyErrorMessageIsDisplayed(failedLoginMessage);
// });
