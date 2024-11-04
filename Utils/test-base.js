const base = require("@playwright/test");
exports.customTest = base.test.extend({
  testDataForOrder: {
    username: "testtopro@gmail.com",
    password: "Aman@1992",
    product: "ZARA COAT 3",
  },
});
