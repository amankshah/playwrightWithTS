// import { json } from "stream/consumers";

//convert above code in commonjs
const LoginPage = require("./LoginPage.js");
const DashboardPage = require("./DashboardPage.js");
const OrdersHistoryPage = require("./OrdersHistoryPage.js");
const OrdersReviewPage = require("./OrdersReviewPage.js");
const CartPage = require("./CartPage.js");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }

  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }
}



// POManager.js

// export default POManager;
// export POmanger in common js

module.exports = POManager;