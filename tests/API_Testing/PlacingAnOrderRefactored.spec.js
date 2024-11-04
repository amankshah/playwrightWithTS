const { test, expect, request } = require("@playwright/test");
import APIUtils from "../../Utils/APIUtils"; // ES Module syntax
let response;

const ProductToBePurchased = "ZARA COAT 3";
const email = "testtopro@gmail.com";
const password = "Aman@1992";
const loginPayLoad = {
  userEmail: email,
  userPassword: password,
};
const OrderPayLoad = {
  orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }],
};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);

  response = await apiUtils.createOrder(OrderPayLoad);
});

test("@api Client App Login test", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  const orderId = response.ordersId;



  const OrderHistoryPage = page.locator("[routerlink*='myorders']");
  await OrderHistoryPage.first().click();

  await page.locator("tbody tr").first().waitFor();

  const OrderList = page.locator("tbody tr");
  await OrderList.first().waitFor();
  const countOrderList = await OrderList.count();

  for (let i = 0; i < countOrderList; i++) {
    const rowOrderId = await OrderList.nth(i).locator("th").textContent();
    if (rowOrderId.includes(orderId)) {
      await OrderList.nth(i).locator("button").first().click();
      console.log("Order found and clicked");

      break;
    }
  }
  const OrderIdDetails = await page.locator(".col-text").first().textContent();
  console.log(OrderIdDetails);
  expect(orderId.includes(OrderIdDetails)).toBeTruthy();
});
