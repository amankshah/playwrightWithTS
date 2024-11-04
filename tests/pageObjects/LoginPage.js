class LoginPage {
  constructor(page) {
    this.page = page;

    this.UserEmail = page.locator("#userEmail");
    this.UserPassword = page.locator("#userPassword");
    this.SignInButton = page.locator("#login");
  }
  async goTo() {
    const loginPageUrl = "https://rahulshettyacademy.com/client";
    await this.page.goto(loginPageUrl);
  }
  async ValidLogin(email, password) {
    await this.UserEmail.fill(email);
    await this.UserPassword.fill(password);
    await this.SignInButton.waitFor();
    await this.SignInButton.click();
  }
}
module.exports = LoginPage;
