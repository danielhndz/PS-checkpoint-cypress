/// <reference types="Cypress"/>

import { closeLocationPopupIfAppears } from "./utils.cy";

let item = "Guitar";
let brand = "Fender";
let model = "Stratocaster";
let artist = "Jimi Hendrix";

describe("Workarounds for an item that does not ship to Colombia", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    closeLocationPopupIfAppears();
  });

  it("looking for an option", () => {
    lookingForAnItemSuchAsDescribed(item, brand, model, artist);
    // Add to cart button of an available option
    cy.get(".add-to-cart-button").first().should("be.visible");
  });

  it("Add to cart the first option", () => {
    lookingForAnItemSuchAsDescribed(item, brand, model, artist);
    cy.addFirstItemToCart();
  });

  it("Remove from cart the first option", () => {
    lookingForAnItemSuchAsDescribed(item, brand, model, artist);
    cy.addFirstItemToCart();
    cy.get("[data-toggle-confirmation]").click();
    cy.get(".site-wrapper--narrow h2").should("contain.text", "cart is empty");
  });
});

// Such as described means an item that does not ship to Colombia
function lookingForAnItemSuchAsDescribed(item, brand, model, artist) {
  let selector =
    "ul button.category-flyout-header__link[data-header-category='".concat(
      item.toLowerCase(),
      "s']"
    );
  cy.get(selector).click();
  selector = "a.category-flyout__link[href*='".concat(
    model.toLowerCase(),
    "']"
  );
  cy.get(selector).click();
  cy.url().should("include", model.toLowerCase());
  closeLocationPopupIfAppears();
  cy.get(".page-hero__title").should("have.text", brand.concat(" ", model));
  selector = "div.dynamic-page__sidebar a[href*='".concat(
    formatArtistName(artist),
    "']"
  );
  cy.get(selector).click();
  cy.url().should("include", formatArtistName(artist));
  cy.get(".page-hero__title").should(
    "have.text",
    brand.concat(" ", artist, " ", model)
  );
  selector = "a[href$='".concat(
    brand.toLowerCase(),
    "-",
    formatArtistName(artist),
    "-",
    model.toLowerCase(),
    "']"
  );
  cy.get(selector).click();
  cy.get(".csp2-header__title").should(
    "have.text",
    brand.concat(" ", artist, " ", model)
  );
  // Alert about the item that does not ship to Colombia
  cy.get(".rc-alert-box__content").should("be.visible");
}

function formatArtistName(name) {
  let nameFormatted = "" + name;
  return nameFormatted.toLowerCase().replace(" ", "-");
}
