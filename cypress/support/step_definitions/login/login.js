/// <reference types="Cypress"/>

import data from "../../../fixtures/data.json";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../../page_objects/login_page";

const loginPage = new LoginPage();

Given("the user is on the login page", () => {
  loginPage.navigate();
});

When("the user enters valid credentials", () => {
  loginPage.enterUsernamePassword(data.correctEmail, data.correctPassword);
});

Given("unchecks remember me option", () => {
  loginPage.uncheckRememberMeOption();
});

Given("clicks on submit button", () => {
  loginPage.clickSubmitButton();
});

Then("the user info should be displayed", () => {
  loginPage.verifyFirstNameIsDisplayed(data.correctFirstName);
  loginPage.verifyFullNameIsDisplayed(
    data.correctFirstName,
    data.correctLastName
  );
});

When("the user enters invalid credentials", () => {
  loginPage.enterUsernamePassword(data.incorrectEmail, data.incorrectPassword);
});

Then("the user is redirected", () => {
  loginPage.verifyFailedLoginRedirectionUrl();
});

Given("an error message should be displayed", () => {
  loginPage.verifyErrorMessageIsDisplayed(data.failedLoginMessage);
});
