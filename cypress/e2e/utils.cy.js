/// <reference types="Cypress"/>

export function closeLocationPopupIfAppears() {
  cy.get(".fa.fa-close").then(($button) => {
    if ($button.is(":visible")) {
      cy.wrap($button).click();
    } else {
      console.info("Location pop-up do not appear");
    }
  });
}
