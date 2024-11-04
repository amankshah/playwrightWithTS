
// const LoginPage = require("./LoginPage.js");
import { LoginPage } from "./LoginPage"; // Importing in ts

// const DashboardPage = require("./DashboardPage.js");
// const OrdersHistoryPage = require("./OrdersHistoryPage.js");
// const OrdersReviewPage = require("./OrdersReviewPage.js");
// const CartPage = require("./CartPage.js");

import { DashboardPage } from "./DashboardPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";
import { CartPage } from "./CartPage";
import {Page} from "@playwright/test";

export class POManager {

  loginPage:LoginPage;
  dashboardPage:DashboardPage;
  ordersHistoryPage:OrdersHistoryPage;
  ordersReviewPage:OrdersReviewPage;
  cartPage:CartPage;
  page:Page;

  constructor(page:Page) {
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