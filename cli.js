const inquirer = require("inquirer");
const helpers = require("./helpers");
const { getProducts } = require("./getProducts");

function getLastPrice(intrestingProduct) {
  return intrestingProduct.prices[intrestingProduct.prices.length - 1];
}

function getFlagRepresentation(intrestingProduct) {
  return helpers.getProductFlag(
    intrestingProduct.prices[intrestingProduct.prices.length - 1],
    intrestingProduct.prices[intrestingProduct.prices.length - 2]
  );
}

async function askUserForProduct(products) {
  try {
    const answers = await inquirer.prompt([
      // Згідно API https://www.npmjs.com/package/inquirer передали список запитань
      {
        message: "Please insert product name",
        name: "product_name", // Унікальний ключ запитання
        type: "input", // Тип очікуваної відповіді
      },
    ]);
    
    console.log("Виші відповіді: ", answers);

    // instanceof Array
    const intrestingProduct = products.find(
      (product) => product.product === answers.product_name
    );

    console.log("Продукт знайдено!");
    console.log("Остання ціна\t| Стан");
    console.log(
      `${getLastPrice(intrestingProduct)}\t\t| ${getFlagRepresentation(
        intrestingProduct
      )}`
    );
  } catch (error) {
    console.error("Підчас обробки виникла помилка: ", error);
  }
}

askUserForProduct(getProducts());
