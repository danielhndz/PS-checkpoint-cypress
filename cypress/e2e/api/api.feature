Feature: API call

  Scenario: Verify GET request
    When I send a GET request
    Then I should receive a proper response