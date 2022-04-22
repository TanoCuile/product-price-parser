function loadPageData(product) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // AFTER SOME AMOUNT OF TIME...
      resolve({ body: `LOREM ipsum dolor\nset amet comit\ndolor.` });
    }, 1000);
  });
}

// callback hell
// Promise hell

loadPageData()
  .then(({ body }) => {
    return body.split("\n");
  })
  .catch((error) => {
    console.error(error);
    return [];
  })
  .then((lines) => {
    if (lines.length > 1) {
      // Do somethin
    } else if (lines.length > 2) {
      // Do somethin
    }
  })
  .catch((error) => {
    console.error(error);
  });

const products = require("../products.json");

// Promise.all(products.map((p) => loadPageData(p))).then(() => ...);

products.reduce(
  (prev, p) =>
    prev.then((combined) =>
      loadPageData(p)
        .then(({ body }) => {
          return body.split("\n");
        })
        .catch((error) => {
          console.error(error);
          return [];
        })
        .then((lines) => {
          combined.push({ product: p, lines: lines });
        })
        .catch((error) => {
          console.error(error);
        })
    ),
  Promise.resolve([])
);

// Async/Await

async function refreshPrices() {
  const combined = [];
  try {
    for (const p of products) {
      let lines = [];
      try {
        const { body } = await loadPageData(p);
        lines = body.split("\n");
      } catch (error) {
        console.log(error);
        lines = [];
      }
      combined.push({ product: p, lines: lines });
    }
  } catch (error) {
    console.error(error);
  }
}

refreshPrices();
