const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { query, params, body, validationResult , checkSchema} = require("express-validator");
const { checkUsernameValidator } = require("./utils/shema.mjs");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
const products = [
  { id: 1, name: "Laptop", price: 5000 },
  { id: 2, name: "Phone", price: 3000 },
];
app.get("/", (req, res) => {
  //console.log("method",req.method);
  //console.log("url",req.url);
  //console.log("headers",req.headers);
  console.log(req.body);
  res.send("Home");
  /*res.send()
  res.json()
  res.status()
  res.sendStatus()
  res.redirect()
  res.end()*/
});
app.use(express.urlencoded({ extended: true }));

const checkLogin = (req, res) => {
  const result = validationResult(req);
  const list = result.array();
  console.log("liiist :", list);
  console.log("is empty", result.isEmpty());

  console.log("thre result", result);
  console.log(req.body.name);
  console.log(req.body.price);

  res.send("Login data received");
};

app.get(
  "/login",
  query("filter")
    .isString()
    .withMessage("should be a string")
    .notEmpty()
    .withMessage("must not be empty")
    .isLength({ min: 4, max: 10 })
    .withMessage("must be between 4 and 10 caracters"),
  checkLogin,
);
const checkId = (request, response, next) => {
  console.log("check is middlware ...");
  next();
};
app.use("/", checkId, (request, response, next) => {
  console.log("finished middlwares checks ...");
  next();
});
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);
  console.log(product);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});
app.get("/users/:userId/orders/:orderId", (req, res) => {
  // parameters
  console.log("params: ", Number(req.params.userId));
  console.log("params: ", Number(req.params.orderId));
  res.send(products);
  //querys
  console.log("query: ", req.query.category);
  console.log(req.body);
});

app.post(
  "/products",checkSchema(checkUsernameValidator),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    res.send("product created");
  },
);
app.put("/products/:id", (req, res) => {
  res.send("product replaced");
});
// validation section

app.listen(3000, () => {
  console.log("Server running");
});
