 const mockUsers = require("../../data/mockusers");
const session = require("express-session");
const express = require("express");
 

const app = express();
app.use(express.json());

app.use(session({
  secret: "my-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60, httpOnly: true },
}));
app.post("/manuall/auth", (req, res) => {
    const {username, password} = req.body;
    console.log("username :", username);
    console.log("password :", password);
    const foundUser = mockUsers.find(u => u.username === username);
    if(!foundUser || foundUser.password !== password ) return res.status(404).send({mssg : "user not found"});
    req.session.user = foundUser;
    console.log("req.session :", res.session)
    res.send(req.session);
})

const checkauth = (req, res, next) => {
    console.log(req.session);
    if(!req.session.user) return res.status(401).send({mssg : "you are not authenticated"});
    next();
}

app.get("/manuall/profile", checkauth , (req, res)=>{
    res.send(req.session.user);
})

app.listen(3000,()=>{
    console.log("listening on port 3000 ...");
});