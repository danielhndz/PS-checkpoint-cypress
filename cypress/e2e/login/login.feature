Feature:  Login
  
  Scenario: User enters valid data
    Given the user is on the login page
    When the user enters valid credentials
      And unchecks remember me option
      And clicks on submit button
    Then the user info should be displayed
  
  Scenario: User enters invalid data
    Given the user is on the login page
    When the user enters invalid credentials
      And unchecks remember me option
      And clicks on submit button
    Then the user is redirected
      And an error message should be displayed