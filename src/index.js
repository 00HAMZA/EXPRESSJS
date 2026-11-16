const express = require("express");
const cookieParser = require("cookie-parser");

const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Register all routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.status(200).send("Route works!");
});

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log("Running on port", Port);
});
