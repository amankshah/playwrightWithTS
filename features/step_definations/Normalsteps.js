/*



const { When, Then, Given } = require("@cucumber/cucumber");
const { expect, chromium } = require("@playwright/test");
const POManager = require("../../tests/pageObjects/POManager");
const dataSet = JSON.parse(
  JSON.stringify(require("../../Utils/placeOrderTestData.json"))
);

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 10000 }, // Set timeout to 10 seconds
  async function (username, password) {
    this.browser = await chromium.launch(); // Launch the browser
    this.context = await this.browser.newContext(); // Create a new browser context
    this.page = await this.context.newPage(); // Create a new page

    this.poManager = new POManager(this.page); // this keyword is coming from world constructor of the cucumber world class
    this.loginPage = this.poManager.getLoginPage();

    this.UserEmail = username;
    this.UserPassword = password;

    await this.loginPage.goTo();
    await this.loginPage.ValidLogin(this.UserEmail, this.UserPassword);
  }
);

When("Add {string} to Cart", async function (product) {
  this.dashboardPage = this.poManager.getDashboardPage();

  await this.dashboardPage.searchProductAndAddToCart(product);
  await this.dashboardPage.clickCartButton();
});

Then(
  "Verify {string} is displayed in the Cart",
  async function (ProductToBePurchased) {
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(ProductToBePurchased);
    await this.cartPage.Checkout();
  }
);

When("Enter Valid details and place the order", async function () {
  this.ordersReviewPage = this.poManager.getOrdersReviewPage();
  await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then("Verify order is present in the orderHistoryPage", async function () {
  await this.dashboardPage.navigateToOrders();
  this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(
    this.orderId.includes(await this.ordersHistoryPage.getOrderId())
  ).toBeTruthy();
});


*/
