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

// let index = 0;
// Варто використовувати, коли дуже складна умова закінчення
// while (index < products.length) {
//     console.log(`#${index}`, products[index].name, products[index].latestPrice);
//     index += 1;
// }

// Зручніший варіант, для роботи з масивами
// for (let i = 0; i < products.length; ++i)
//   console.log(`#${i}`, products[i].name, products[i].latestPrice);

// for (let i in products)
//   console.log(`#${i}`, products[i].name, products[i].latestPrice);

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

// const product3 = "Xiaomi Redmi HDD,PNG";
// const product3price1 = 34048.39;
// const product3price2 = 13456.06;
// const product3price3 = 15800.45;
// const product3price4 = 17712.19;
// const product3price5 = 8480.41;
// const maker3 = "Xiaomi";
// const model3 = "Redmi";

// Потрібно дізнатись, чи впала ціна?
// Потрібно дізнатись, чи великий стрибок? Якщо великий спад - рекомендуюмо купувати.
// Важливо: потрібно швидко додати перевірку для нового товару!
