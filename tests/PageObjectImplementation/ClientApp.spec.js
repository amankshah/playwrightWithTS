import { test, expect } from "@playwright/test";
import POManager from "../pageObjects/POManager.js";
const dataSet = JSON.parse(
  JSON.stringify(require("../../Utils/placeOrderTestData.json"))
);

test("Login Test", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();

  const UserEmail = dataSet.username;
  const UserPassword = dataSet.password;
  const ProductToBePurchased = dataSet.product;

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
