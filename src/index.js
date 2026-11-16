const express = require("express");
const cookieParser = require("cookie-parser");
const mockUsers = require("../data/mockusers");

const routes = require("./routes/index");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(cookieParser("myCookieSecret"));
app.use(
  session({
    secret: "hamza the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 100000,
    },
  }),
);

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

app.listen(Port, () => {
  console.log("Running on port", Port);
});

app.post("/api/auth", (req, res)=> {
  const  {body : {username, password} } = req;
  const findUser = mockUsers.find(u => u.username === username);
  if(!findUser || findUser.password != password)
    return res.status(401).send({msg : "BAD CREDENTIALES"});
  console.log("before :", req.session.user);
  req.session.user = findUser;
  console.log("after :", req.session.user);
  return res.status(200).send(findUser);
})
app.get("/api/auth/status",(req, res)=> {
  return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg : "NOT AUTHENTICATED."});
})