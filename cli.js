const inquirer = require("inquirer");
const { getProductFlag } = require("./helpers");
const { loadProductsForPage } = require("./services/loadPageProducts");
const { getProducts } = require("./repository/product.repository");

function getLastPrice(intrestingProduct) {
  return intrestingProduct.prices[intrestingProduct.prices.length - 1];
}

function getFlagRepresentation(intrestingProduct) {
  return getProductFlag(
    intrestingProduct.prices[intrestingProduct.prices.length - 2],
    intrestingProduct.prices[intrestingProduct.prices.length - 1]
  );
}

const ACTION_PRODUCT_STATS = "product_stats";
const ACTION_LOAD_PRODUCTS = "load_products";

/**
 * @param {import('./repository/product.repository').Product[]} products
 */
async function askUserForProduct(products) {
  try {
    const answers = await inquirer.prompt([
      {
        name: "action",
        message: "Choose action to perform",
        type: "list",
        choices: [
          {
            name: "Load products from page",
            value: ACTION_LOAD_PRODUCTS,
          },
          {
            name: "Give product stats",
            value: ACTION_PRODUCT_STATS,
          },
        ],
      },
      {
        message: "Setup page to load",
        name: "page",
        default: 1,
        type: "number",
        when: ({ action }) => action === ACTION_LOAD_PRODUCTS,
      },
      // Згідно API https://www.npmjs.com/package/inquirer передали список запитань
      {
        message: "Please select product",
        name: "product", // Унікальний ключ запитання
        type: "list", // Тип очікуваної відповіді
        // `choices` - параметер до типу `list`, де вказано можливі варіанти для вибору
        // API: https://github.com/SBoudrias/Inquirer.js#list---type-list
        // Також можете поекспериментувати з https://github.com/mokkabonna/inquirer-autocomplete-prompt
        // `Object.entries` - перетворює {key_1: "value_1"} => [["key_1", "value_1"]]
        // Таким чином зручно проходитись по всих полях об'єкту
        choices: Object.entries(products).map((entry) => {
          const [name, product] = entry;
          // Перетворюємо `entry` в https://github.com/SBoudrias/Inquirer.js#question
          return { name, value: product };
        }),
        when: ({ action }) => action === ACTION_PRODUCT_STATS,
      },
    ]);

    switch (answers.action) {
      case ACTION_LOAD_PRODUCTS:
        await loadProductsForPage({ page: answers.page });
        console.log("DONE");
        break;
      case ACTION_PRODUCT_STATS:
        // instanceof Array
        const intrestingProduct = answers.product;

        console.log("Продукт знайдено!");
        console.log("Остання ціна\t| Стан");
        console.log(
          `${getLastPrice(intrestingProduct)}\t\t| ${getFlagRepresentation(
            intrestingProduct
          )}`
        );
        break;
    }
  } catch (error) {
    console.error("Підчас обробки виникла помилка: ", error);
  }
}

// Тут .then передасть автоматично дані в функцію, яку ми передали
getProducts().then(askUserForProduct);
