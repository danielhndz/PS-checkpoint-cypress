export class CartPage {
  lookingForAnItemThatDoesNotShipToColombia(item, brand, model, artist) {
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
    cy.closeLocationPopupIfAppears();
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
}

function formatArtistName(name) {
  let nameFormatted = "" + name;
  return nameFormatted.toLowerCase().replace(" ", "-");
}
