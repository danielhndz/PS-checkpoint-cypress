Feature: Cart

  Background: Workarounds for an item that does not ship to Colombia

  Scenario: User searches for an option
    Given the user is on an item that does not ship to Colombia
    Then al least one available option related to the desired item should be displayed

  Scenario: User adds to cart the first option
    Given the user is on an item that does not ship to Colombia
      And at least one available option related to the desired item is displayed
    When the user clicks on add to cart button of the first option
    Then a message with 1 Item in Your Cart should be displayed
  
  Scenario: User removes from the cart the first option
    Given the user has an item in the cart
    When the user clicks on remove button
    Then a message with cart is empty should be displayed