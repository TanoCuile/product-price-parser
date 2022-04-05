const {
  NO_FLAG,
  FLAG_ERROR,
  FLAG_PRICE_DECREASE,
  FLAG_PRICE_HUGE_DECREASE,
  FLAG_PRICE_INCREASE,
} = require("./constants");
const helpers = require("./helpers");
const { getProducts } = require("./getProducts");
const products = getProducts();

function logProductsWithDiscount() {
  for (let p of products) {
    p.flag = helpers.getProductFlag(p.prices[p.prices.length - 1], p.prices[p.prices.length - 2]);
  }
  
  const productsForNotification = [];
  for (let p of products) {
    switch (p.flag) {
      case FLAG_PRICE_HUGE_DECREASE:
        productsForNotification.push(p); // Варто працювати з кінцем масиву
        break;
      case FLAG_PRICE_DECREASE:
      case FLAG_PRICE_INCREASE:
      case FLAG_ERROR:
      case NO_FLAG:
      default:
        console.log(p.product, "proceed");
    }
  }
  
  console.log('Продукти скидкою', productsForNotification.length);
}
