/// <reference types="Cypress"/>

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import data from "../../../fixtures/data.json";
import { CartPage } from "../../page_objects/cart_page";

const cartPage = new CartPage();

Given("the user is on an item that does not ship to Colombia", () => {
  lookingForAnItemSuchAsDescribed();
});

Then(
  "al least one available option related to the desired item should be displayed",
  () => {
    // Add to cart button of an available option
    cy.get(".add-to-cart-button").first().should("be.visible");
  }
);

Given(
  "at least one available option related to the desired item is displayed",
  () => {
    // Add to cart button of an available option
    cy.get(".add-to-cart-button").first().should("be.visible");
  }
);

When("the user clicks on add to cart button of the first option", () => {
  cy.addFirstOptionToCart();
  cy.url().should("include", "cart");
});

Then("a message with 1 Item in Your Cart should be displayed", () => {
  cy.get(".dashboard-page-header__title span").should(
    "contain.text",
    "1 Item in Your Cart"
  );
});

Given("the user has an item in the cart", () => {
  lookingForAnItemSuchAsDescribed();
  cy.addFirstOptionToCart();
  cy.url().should("include", "cart");
  cy.get(".dashboard-page-header__title span").should(
    "contain.text",
    "1 Item in Your Cart"
  );
});

When("the user clicks on remove button", () => {
  cy.get("[data-toggle-confirmation]").click();
});

Then("a message with cart is empty should be displayed", () => {
  cy.get(".site-wrapper--narrow h2").should("contain.text", "cart is empty");
});

function lookingForAnItemSuchAsDescribed() {
  cy.visit(Cypress.env("baseUrl"));
  cy.closeLocationPopupIfAppears();
  cartPage.lookingForAnItemThatDoesNotShipToColombia(
    data.item,
    data.brand,
    data.model,
    data.artist
  );
}
