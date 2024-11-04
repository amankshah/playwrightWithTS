Feature: Ecommerce Process Validation

  @Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with "testtopro@gmail.com" and "Aman@1992"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter Valid details and place the order
    Then Verify order is present in the orderHistoryPage

  @Regression
  Scenario: Placing the order and checking for wrong product
    Given a login to Ecommerce application with "testtopro@gmail.com" and "Aman@1992"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 4" is displayed in the Cart
    When Enter Valid details and place the order
    Then Verify order is present in the orderHistoryPage
