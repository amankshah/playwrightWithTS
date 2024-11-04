import { test, expect } from "@playwright/test";
const { customTest } = require("../../Utils/test-base.js");
import POManager from "../pageObjects/POManager.js";
const dataSet = JSON.parse(
  JSON.stringify(require("../../Utils/ParameterizedProcessTestData.json"))
);
// test.describe.configure({ mode: "parallel" }); // to run the test cases in single  in parallel mode
// test.describe.configure({ mode: "serial" }); // to run the test cases in single  in serial mode- In this mode if any test case fails it will stop the execution
for (const data of dataSet) {
  test(`Product Purchase Test - ${data.product}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    const UserEmail = data.username;
    const UserPassword = data.password;
    const ProductToBePurchased = data.product;

    await loginPage.goTo();
    await loginPage.ValidLogin(UserEmail, UserPassword);

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.searchProductAndAddToCart(ProductToBePurchased);

    await dashboardPage.clickCartButton();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(ProductToBePurchased);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}
customTest(
  `Product Purchase Test `,
  async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    const UserEmail = testDataForOrder.username;
    const UserPassword = testDataForOrder.password;
    const ProductToBePurchased = testDataForOrder.product;

    await loginPage.goTo();
    await loginPage.ValidLogin(UserEmail, UserPassword);

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.searchProductAndAddToCart(ProductToBePurchased);

    await dashboardPage.clickCartButton();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(ProductToBePurchased);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  }
);
