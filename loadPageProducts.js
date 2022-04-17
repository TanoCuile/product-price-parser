const { default: axios } = require("axios");
const cheerio = require("cheerio");
const { saveProduct } = require("./repository/product.repository");

module.exports = {
  /**
   * @param {{
   *    page: number
   * }} payload
   *
   * @returns {Promise<{
   *    name: string,
   *    url: string,
   *    maker: string,
   *    model: string,
   *    memory: string,
   *    characteristics: string,
   *    currency: string,
   *    price: number
   * }>}
   */
  loadProductsForPage: async ({ page }) => {
    return axios
      .get(`https://allo.ua/ua/products/mobile/p-${page || 1}/`)
      .then(async (response) => {
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
          const regexExecution =
            /^(Sony\ Ericson|[\w]+)\ (.*)\ ([\d\/]+GB)\ (.*)$/gm.exec(name);

          const [, maker, model, memory, characteristics] = regexExecution
            ? regexExecution.reduce((acc, item) => acc.concat([item]), [])
            : [];

          const url = card("a.product-card__title").attr("href");
          const price = card(".v-price-box__cur .sum").text();
          const currency = card(".v-price-box__cur .currency").text();

          products.push({
            name,
            maker,
            model,
            memory,
            characteristics,
            url,
            price: Number(price.replace(/\ /gm, "")), // .replace - один з вбудованих методів стрічки
            // /\ /gm - регулярний вираз
            currency: currency.replace(/\ /gm, ""),
          });
        });

        for (const product of products) {
          await saveProduct(product);
        }
      });
  },
};
