const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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
  console.log(req.body.name);
  console.log(req.body.price);

  res.send("Login data received");
};

app.get("/login", checkLogin);
const checkId = (request, response, next) => {
  console.log("check is middlware ...");
  next();
};
app.use("/products", checkId, (request, response, next) => {
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

app.post("/products", (req, res) => {
  res.send("product created");
});
app.put("/products/:id", (req, res) => {
  res.send("product replaced");
});

app.listen(3000, () => {
  console.log("Server running");
});
