const fs = require("fs/promises");
const path = require("path");
const PATH_TO_PRODUCTS_DATA = path.join(process.cwd(), "data", "products.json");

/**
 * @typedef {{
 *    name: string,
 *    url: string,
 *    maker: string,
 *    model: string,
 *    memory: string,
 *    characteristics: string,
 *    currency: string,
 *    price: number
 * }} NewProduct
 */

/**
 * @typedef {{
 *    name: string,
 *    url: string,
 *    maker: string,
 *    model: string,
 *    memory: string,
 *    characteristics: string,
 *    currency: string,
 *    lastPrice: number,
 *    prices: number[],
 * }} Product
 */

let products = null;

const getCommonProductFields = (product) => {
  const commonEntries = Object.entries(product).filter(([name]) =>
    [
      "name",
      "url",
      "maker",
      "model",
      "memory",
      "characteristics",
      "currency",
    ].includes(name)
  );

  return Object.fromEntries(commonEntries);
};

/**
 * Convert from `NewProduct` to `Product`
 *
 * @param {NewProduct} newProduct
 * @param {Product|undefined} existingProduct
 *
 * @returns {Product}
 */
const getBuitProduct = (newProduct, existingProduct) => {
  /**
   * @type {Product}
   */
  let result = {
    prices: [],
    lastPrice: null,
  };

  if (existingProduct) {
    result = existingProduct;
  }

  const prices = result.prices;
  if (result.lastPrice !== newProduct.price) {
    prices.push(newProduct.price);
  }

  return {
    ...getCommonProductFields(newProduct),
    prices,
    lastPrice: newProduct.price,
  };
};

const getProducts = async () => {
  if (!products) {
    const bufferedData = await fs.readFile(PATH_TO_PRODUCTS_DATA);
    products = JSON.parse(bufferedData.toString());
  }

  return products;
};

module.exports = {
  /**
   * @returns {Promise<{[key: string]: Product}>}
   */
  getProducts,
  /**
   * @param {NewProduct | Product} product
   *
   * @returns {Promise<void>}
   */
  saveProduct: async (product) => {
    const products = await getProducts();
    // Додамо перевірку, щоб вірно оновити поле ціни
    products[product.name] = product.price
      ? getBuitProduct(product, products[product.name])
      : product;

    return fs.writeFile(PATH_TO_PRODUCTS_DATA, JSON.stringify(products));
  },
};
