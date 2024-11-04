class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    // Target a more specific tbody that contains order rows, possibly by including a unique class or parent element
    this.ordersTable = page.locator("tbody:has(tr)");
    this.rows = this.ordersTable.locator("tr");
    this.orderIdDetails = page.locator(".col-text");
  }

  async searchOrderAndSelect(orderId) {
    // Wait for the network to be idle and ensure orders table is present
    await this.page.waitForLoadState("networkidle");
    
    // Narrow the waitFor locator to the specific table with orders
    await this.ordersTable.waitFor();

    const rowCount = await this.rows.count();
    console.log(`Found ${rowCount} rows in the orders table`);

    for (let i = 0; i < rowCount; i++) {
      // Get the Order ID text from each row
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();

      console.log(`Checking Order ID in row ${i}: ${rowOrderId}`);

      // Compare the order ID
      if (orderId.includes(rowOrderId)) {
        console.log(`Order found: ${rowOrderId}`);
        
        // Click the button in the matching row to view order details
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async getOrderId() {
    // Return the order ID from the details page
    return await this.orderIdDetails.textContent();
  }
}

module.exports = OrdersHistoryPage;
