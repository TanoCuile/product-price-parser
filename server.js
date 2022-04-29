const express = require("express");
const path = require("path");

function getProductDataByURL(url) {
  // Do work!
  console.log("Add product by URL");
}

let latestVisitorId = 1;

const app = express();
// Automatically convert 'body'(if that's possible) to JSON
app.use(express.json());

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use("", (req, res, next) => {
  console.log("First middleware");
  let cookies = getRequestCookies(req);
  req.visitor_id = cookies.visitor_id;

  next();
});

app.post("/products", (req, res) => {
  let data = req.body;

  console.log("BODY > ", data);

  res.render("home", { visitor_id: req.visitor_id });
});
// app.put()
// app.options()
// app.delete()
app.get(
  "",
  (req, res, next) => {
    console.log("Small middleware");
    next();
  },
  (req, res) => {
    res.render("home", { visitor_id: req.visitor_id });
  }
);

// code: 'EADDRINUSE' - Порт уже використовується, виберіть інший, або зупиніть інший процес

app.listen(8080, "localhost", () => {
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
