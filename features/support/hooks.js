const {
  Before,
  After,
  BeforeStep,
  AfterStep,
  Status,
} = require("@cucumber/cucumber");
const { expect, chromium } = require("@playwright/test");
const POManager = require("../../tests/pageObjects/POManager");

Before(async function () {
  this.browser = await chromium.launch(); // Launch the browser
  // this.browser = await chromium.launch({ headless: false }); // Launch the browser headed mode
  this.context = await this.browser.newContext(); // Create a new browser context
  this.page = await this.context.newPage(); // Create a new page

  this.poManager = new POManager(this.page);
});

Before({ tags: "@Regression" }, async function () {
  this.browser = await chromium.launch(); // Launch the browser
  this.context = await this.browser.newContext(); // Create a new browser context
  this.page = await this.context.newPage(); // Create a new page

  this.poManager = new POManager(this.page);
});
After(async function ({ TestInfo, result }) {
  console.log(" Status: " + result.status);

  await this.browser.close();
});

BeforeStep(async function () {
  console.log("BeforeStep hook called");
});

AfterStep(async function ({ result, TestInfo }) {
  if (result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();

    const path = "TestScreenshots.png";
    await this.page.locator("body").screenshot({ path });
  }
  console.log("AfterStep hook called");
});
