const express = require("express");
const cookieParser = require("cookie-parser");
const mockUsers = require("../data/mockusers");

const routes = require("./routes/index");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
require("./strategies/local-strategy");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
})
const connectDB = require("../data/db");
const app = express();

app.use(express.json());
app.use(cookieParser("myCookieSecret"));
app.use(
  session({
    secret: "hamza the dev",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 30000 * 70,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
// Register all routes
app.use("/api", routes);

app.get("/", (req, res) => {
  console.log("sesion from index.js :", req.session);
  console.log("session.id  from  index.js: ", req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 3000, signed: true });

  res.send("Cookie set");
});

const Port = process.env.PORT || 3000;

/*app.listen(Port, () => {
  console.log("Running on port", Port);
});*/

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = mockUsers.find((u) => u.username === username);
  if (!findUser || findUser.password != password)
    return res.status(401).send({ msg: "BAD CREDENTIALES" });
  console.log("before :", req.session.user);
  req.session.user = findUser;
  req.session.kaka = "tfa7a";
  console.log("after :", req.session);
  console.log("tfa7a :", req.session);
  return res.status(200).send(findUser);
});
app.get("/api/auth/status", (req, res) => {
  console.log("status :", req.session);
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "NOT AUTHENTICATED." });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.status(401).send("not autorized");
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    console.log("item :", cart);
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(cart);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart);
});

app.post("/api/passport", passport.authenticate("local"), (req, res) => {
  res.send(200);
});
app.get("/api/passport/status", (req, res) => {
  console.log("inside passport/status endpoint");
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});
app.post("/api/passport/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send({ msg: "logged out", session: req.session });
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(Port, () => {
    console.log("listening on the port 3000...");
  });
};
startServer();
