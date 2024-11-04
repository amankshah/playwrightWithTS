const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title()); // Logs the title of the page for debugging.

    // Fill in the username and password fields.
    await this.page.locator("#username").fill(username);
    await this.page.locator('[type="password"]').fill(password);
    console.log(
      "username: " + username + " and password is filled: " + password
    );

    // Click the sign-in button.
    await this.page.locator("#signInBtn").click();
  }
);

Then("Verify Error message is displayed", async function () {
  // Locate the error message.
  this.errorMessage = this.page.locator("[style*='block']");

  // Log the error message text for debugging.
  console.log(await this.errorMessage.textContent());

  // Verify that the error message contains the word "Incorrect".
  await expect(this.errorMessage).toContainText("Incorrect");
});
