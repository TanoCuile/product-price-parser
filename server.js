const http = require("http");

function getProductDataByURL(url) {
  // Do work!
  console.log("Add product by URL");
}

let latestVisitorId = 1;

/**
 * @type {import('http').RequestListener}
 */
const requestListener = (req, res) => {
  // req - ReadableStream
  // res - WritableStream
  console.log(req.method, req.url);

  let cookies = getRequestCookies(req);

  res.setHeader("Content-Type", "text/html");

  setUpVisitorCookie(cookies, res);

  if (req.method.toLowerCase() === "post") {
    if (req.url === "/product") {
      let data = [];

      req.on("data", getChunkListener(data));
      req.on("end", () => {
        try {
          const {
            data: { url },
          } = JSON.parse(data.join("")) || { data: {} };
          if (url) {
            getProductDataByURL(url);
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
    // else if (req.url === "/site") {
    // else if (req.url === "/user") {
    // else if (req.url === "/category") {
    // ...

    // Домашнє завдання
    // При обробці POST /products - ви вивели HTML повідомлення про успішне додавання продукту.
  }

  // if (req.url === "/") {
  res.write(`
<!DOCTYPE html>
<html>
    <head>
        <title>Hello visitor ${cookies.visitor_id || "newcomer"} world!</title>
    </head>
    <body>Server response</body>
</html>
    `);

  // else if (req.url === "/user") {
  // else if (req.url === "/category") {
  // ...

  res.end();
};

const server = new http.Server(requestListener);

// code: 'EADDRINUSE' - Порт уже використовується, виберіть інший, або зупиніть інший процес

server.listen(8080, "localhost", () => {
  console.log("Server started");
});

/**
 *
 * @param {String[]} data
 * @returns {(chunk: Buffer) => void}
 */
function getChunkListener(data) {
  /**
   * @param {Buffer} chunk
   */
  return (chunk) => {
    data.push(chunk.toString());
  };
}

function setUpVisitorCookie(cookies, res) {
  if (!cookies.visitor_id) {
    res.setHeader("Set-Cookie", `visitor_id=${latestVisitorId}`);
    latestVisitorId += 1;

    console.log("New id", latestVisitorId);
  }
}

function getRequestCookies(req) {
  let cookies = {};

  // headers.cookie = 'cookieName1=some_value;cookieName2=some_value2 expDate host_name ...;'
  if (req.headers.cookie) {
    cookies = Object.fromEntries(
      req.headers.cookie
        .split(";")
        .map((rawCookie) => /([\d\w]+)=([\d\w]+)\ ?/gm.exec(rawCookie))
        // condition ? do when TRUE : do when FALSE
        .map((parseResult) =>
          parseResult ? [parseResult[1], parseResult[2]] : []
        )
    );
  }
  return cookies;
}
