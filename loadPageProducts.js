const { default: axios } = require("axios");
const cheerio = require("cheerio");

module.exports = {
  /**
   * @param {{
   *    page: number
   * }} payload
   *
   * @returns {Promise<{
   *    name: string,
   *    url: string,
   *    currency: string,
   *    price: number
   * }>}
   */
  loadProductsForPage: ({ page }) => {
    return axios
      .get(
        `https://allo.ua/ua/products/mobile/p-${page || 1}/proizvoditel-apple/`
      )
      .then((response) => {
        console.log("Status:", response.status); // Важливо, каже чи з вашим запитом все добре
        // console.log("Headers:", response.headers);
        console.log("Data length", response.data.length);
        // response.data - WEB сторінка в текстовому представленні.
        // Розмічена за допомогою HTML. Для того, щоб знаходити необхідний елемент скористаємось розміткою
        const dom = cheerio.load(response.data); // DOM - Document Object Model

        const products = [];

        dom(".products-layout__container .product-card").map((_index, item) => {
          const card = cheerio.load(item);

          const name = card("a.product-card__title").text();
          const url = card("a.product-card__title").attr("href");
          const price = card(".v-price-box__cur .sum").text();
          const currency = card(".v-price-box__cur .currency").text();
          products.push({
            name,
            url,
            price: Number(price.replace(/\ /gm, "")), // .replace - один з вбудованих методів стрічки
            // /\ /gm - регулярний вираз
            currency: currency.replace(/\ /gm, ""),
          });
        });

        return products;
      });
  },
};
