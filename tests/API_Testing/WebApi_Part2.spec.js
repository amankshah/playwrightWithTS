const { test, expect, request } = require("@playwright/test");

const ProductToBePurchased = "ZARA COAT 3";
const email = "testtopro@gmail.com";
const password = "Aman@1992";
const loginPayLoad = {
  userEmail: email,
  userPassword: password,
};

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "storageState.json" }); //#storing the local storage

  //opening new browser and placing the stored local storage on that
  webContext = await browser.newContext({
    storageState: "storageState.json",
  });
});

test("@api Client App Login test", async () => {
  const page = await webContext.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

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
});
