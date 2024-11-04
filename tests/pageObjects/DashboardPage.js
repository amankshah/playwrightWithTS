class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsName = page.locator(".card-body b");
    this.cartButton = page.locator("[routerlink*='/cart']");
    this.cartCount = page.locator("[routerlink*='/cart'] label");
    this.orderButton = page.locator("[routerlink*='/myorders']");
  }

  async searchProductAndAddToCart(productToBePurchased) {
    try {
      // Wait for the page to be in a stable state before interacting
      await this.page.waitForLoadState("networkidle");

      // Log titles available on the page
      const titles = await this.page.locator(".card-body b").allTextContents();
      console.log("Available product titles:", titles);

      // Get product locator and count of products
      const products = this.page.locator(".card-body");
      const count = await products.count();
      console.log(`Found ${count} products on the page`);

      // Log cart count before adding the product
      const cartCountBefore = await this.cartCount.textContent();
      console.log("Cart Count before adding product: " + cartCountBefore);

      // Loop through products to find the matching one
      for (let i = 0; i < count; i++) {
        const title = await products.nth(i).locator("b").textContent();
        console.log(`Checking product ${i + 1}: ${title}`);

        if (title === productToBePurchased) {
          console.log(`Found matching product: ${title}`);
          // Click "Add To Cart" button
          await this.page.waitForLoadState("networkidle");
          await products.nth(i).getByText("Add To Cart").click();

          // Wait for network to be idle after adding to cart
          await this.page.waitForLoadState("networkidle");

          // Log the cart count after adding the product
          const cartCountAfter = await this.cartCount.textContent();
          console.log(
            "Updated Cart Count after adding product: " + cartCountAfter
          );

          // Break out of the loop once the product is added to the cart
          break;
        }
      }
    } catch (error) {
      // Log any error that occurs during the execution of the method
      console.error("Error in searchProductAndAddToCart:", error);
    }
  }

  async clickCartButton() {
    try {
      await this.cartButton.click();
    } catch (error) {
      // Log any error that occurs during clicking the cart button
      console.error("Error in clickCartButton:", error);
    }
  }

  async navigateToOrders() {
    try {
      await this.orderButton.first().click();
    } catch (error) {
      // Log any error that occurs during navigating to orders
      console.error("Error in navigateToOrders:", error);
    }
  }
}

module.exports = DashboardPage;
