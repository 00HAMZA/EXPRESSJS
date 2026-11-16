const express = require("express");
const cookieParser = require("cookie-parser");

const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Register all routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.cookie("username", "hamza", {
    maxAge: 1000 * 60 * 60, // 1 hour, in milliseconds
    httpOnly: true,
  });
  res.send("Cookie set");

});

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log("Running on port", Port);
});
