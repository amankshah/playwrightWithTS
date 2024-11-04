const { test, expect, request } = require("@playwright/test");

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
const productCode = "6581ca399fd99c85e8ee7f45";

let OrderIdFromAPI = null;
let userToken = null;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  //login
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayLoad,
    }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJSON = await loginResponse.json();
  userToken = loginResponseJSON.token;
  console.log(userToken);

  //Place Order
  const OrderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: OrderPayLoad,
      headers: { Authorization: userToken, "Content-Type": "application/json" },
    }
  );
  expect(OrderResponse.ok()).toBeTruthy();
  const OrderResponseJSON = await OrderResponse.json();
  OrderIdFromAPI = OrderResponseJSON.orders[0];
  console.log(OrderIdFromAPI);
});

test("Client App Login test", async ({ page }) => {
  const apiUtils = new APIUtils(apiContext);

  //# Trying to login with API and storing the token in the local storage
  await page.goto("https://rahulshettyacademy.com/client");
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, userToken);
  // token in this line is the value of token is passed
  await page.goto("https://rahulshettyacademy.com/client");
  const orderId = OrderIdFromAPI;

  console.log(orderId);

  const OderHistoryPage = page.locator("[routerlink*='myorders']");
  await OderHistoryPage.first().click();

  await page.locator("tbody tr").first().waitFor();

  const OrderList = page.locator("tbody tr");
  OrderList.first().waitFor();
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

//Placing an order to the webpage using api
