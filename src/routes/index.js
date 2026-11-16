
const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const productsRouter = require("./products");

// Connect individual routers
router.use("/users", usersRouter);
router.use("/products", productsRouter);

module.exports = router;
