const mockUsers = require("../../data/mockusers");
const session = require("express-session");
const express = require("express");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60, httpOnly: true },
  }),
);
const serializeUser = (req, user) => {
  req.session.user = user.id ;
};
app.post("/manuall/auth", (req, res) => {
  const { username, password } = req.body;
  console.log("username :", username);
  console.log("password :", password);
  const foundUser = mockUsers.find((u) => u.username === username);
  if (!foundUser || foundUser.password !== password)
    return res.status(404).send({ mssg: "user not found" });
  serializeUser(req, foundUser);
  //req.session.user = foundUser;
  console.log("req.session :", req.session);
  res.send(req.session);
});

const deserializeUser = (req, res, next) => {
  const id = req.session.user;
  if (id !== undefined) {
    const user = mockUsers.find((u) => u.id === id);
    if (user) req.user = user;
  }
  next();
};
const checkauth = (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ mssg: "you are not authenticated" });
  next();
};

app.get("/manuall/profile",deserializeUser, checkauth, (req, res) => {
  res.send(req.user);
});

app.post("/manuall/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({msg : "logout failed"});
    res.clearCookie("connect.sid");
    res.send({msg : "logged out"});
  });
});
app.listen(3000, () => {
  console.log("listening on port 3000 ...");
});
