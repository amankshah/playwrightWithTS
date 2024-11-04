Feature: Ecommerce2 Process Validation

  @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username        | password   |
      | aman@gmail.com  | hello@2014 |
      | aman2@gmail.com | hello@0022 |
      | aman4@gmail.com | hello@2014 |
      | aman3@gmail.com | hello@0022 |
