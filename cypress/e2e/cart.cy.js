/// <reference types="Cypress"/>

let artist = "jimi-hendrix";

describe("cart interactions", () => {
  before(() => {
    cy.visit(Cypress.env("baseUrl"));
    closeLocationPopup();
  });

  it("search for, add, and remove item from the cart", () => {
    cy.get(
      "ul button.category-flyout-header__link[data-header-category='guitars']"
    ).click();
    cy.get("a.category-flyout__link[href*='stratocaster']").click();
    cy.url().should("include", "stratocaster");
    closeLocationPopup();
    cy.get(".page-hero__title").contains("Fender Stratocaster");
    cy.get("div.dynamic-page__sidebar a[href*='" + artist + "']").click();
    cy.url().should("include", artist);
    cy.get(".page-hero__title")
      .contains("Jimi Hendrix")
      .and("contain", "Stratocaster");
    cy.get("a[href$='fender-" + artist + "-stratocaster']").click();
    cy.get(".csp2-header__title").contains("Fender Jimi Hendrix Stratocaster");
    cy.get(".rc-alert-box__content").should("be.visible");
    cy.get("li:first-child.tiles__tile button.add-to-cart-button").click();
    cy.url().should("include", "cart");
    cy.get(".dashboard-page-header__title span").contains(
      "1 Item in Your Cart"
    );
    cy.get(".cart-item .d-flex a[class]").contains(
      "Fender Jimi Hendrix Stratocaster, Olympic White, Maple B Stock"
    );
  });
});

function closeLocationPopup() {
  try {
    cy.get(".fa.fa-close").click();
  } catch (error) {
    // nothing to do
  }
}
