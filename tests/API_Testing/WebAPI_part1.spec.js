const { test, expect, request } = require("@playwright/test");

const ProductToBePurchased = "ZARA COAT 3";
const email = "testtopro@gmail.com";
const password = "Aman@1992";
const loginPayLoad = {
  userEmail: email,
  userPassword: password,
};

let userToken = null;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

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
});

test.beforeEach(() => {});

test("@api Client App Login test", async ({ page }) => {
  //# Trying to login with API and storing the token in the local storage
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, userToken);
  // token in this line is the value of token is passed

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();

  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();

  const products = page.locator(".card-body");
  const count = await products.count();

  const CartButton = page.locator("[routerlink*='/cart']");
  const cartCount = await page
    .locator("[routerlink*='/cart'] label")
    .textContent();

  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator("b").textContent();

    if (title === ProductToBePurchased) {
      await products.nth(i).getByText("Add To Cart").click();
      //wait for network ideal
      await page.waitForLoadState("networkidle");
      console.log(cartCount);

      break; //stop the loop
    }
  }
  await CartButton.click();

  //# Cart Page Started -------------------------------------------------------------------
  await page.waitForLoadState("networkidle");
  // await page.locator("div li").first().waitFor();

  const productAddedTheCart = await page
    .getByText(ProductToBePurchased)
    .isVisible();

  expect(productAddedTheCart).toBeTruthy;
  await page.locator("//button[normalize-space()='Checkout']").waitFor();
  await page.locator("//button[normalize-space()='Checkout']").click();

  await page.locator(".payment__title").first().waitFor();
  const CountryFilled = page.locator("[placeholder*='Country']");

  await CountryFilled.pressSequentially("ind");
  const CountryDropDown = page.locator(".ta-results");

  await CountryDropDown.waitFor();

  //find exact match of " India" in the CountryDropDown and click on that
  await CountryDropDown.filter({ hasText: " India" }).first().click();

  // await CountryDropDown.getByText(" India").click();

  console.log(CountryFilled.inputValue());

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email
  );

  await page.locator(".action__submit").first().click();

  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );

  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();

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
      break;
    }
  }
});

//Placing an order to the webpage using api
