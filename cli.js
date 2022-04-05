const inquirer = require("inquirer");
const helpers = require("./helpers");
const { getProducts } = require("./getProducts");

function askUserForProduct(products) {
  return (
    inquirer
      .prompt([
        // Згідно API https://www.npmjs.com/package/inquirer передали список запитань
        {
          message: "Please insert product name",
          name: "product_name", // Унікальний ключ запитання
          type: "input", // Тип очікуваної відповіді
        },
      ])
      // Promise API(then/catch) - для того щоб опрацювати дію, час закінчення якої невідомий
      .then(
        // Передаємо функцію обробник відповіді користувача
        function (answers) {
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
        }
      )
      .catch(
        // Передаємо функцію обробник помилки
        function (error) {
          console.error("Підчас обробки виникла помилка: ", error);
        }
      )
  );
}

askUserForProduct(getProducts());
function getLastPrice(intrestingProduct) {
  return intrestingProduct.prices[intrestingProduct.prices.length - 1];
}

function getFlagRepresentation(intrestingProduct) {
  return helpers.getProductFlag(
    intrestingProduct.prices[intrestingProduct.prices.length - 1],
    intrestingProduct.prices[intrestingProduct.prices.length - 2]
  );
}
