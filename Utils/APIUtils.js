class APIUtils {
  //# Constructor
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  //# Methods
  async getTokens() {
    //login
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayLoad,
      }
    );

    const loginResponseJSON = await loginResponse.json();
    const userToken = loginResponseJSON.token;
    console.log(userToken);
    return userToken;
  }

  async createOrder(OrderPayLoad) {
    let response = {};
    response.token = await this.getTokens();

    const OrderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: OrderPayLoad,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );

    const OrderResponseJSON = await OrderResponse.json();
    const OrderIdFromAPI = OrderResponseJSON.orders[0];

    response.ordersId = OrderIdFromAPI;
    return response;
  }
}
// APIUtils.js
export default APIUtils;
