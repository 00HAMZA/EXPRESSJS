const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("pspss: ", req.signedCookies.username);
  if (req.signedCookies.username && req.signedCookies.username === "hamza")
    return res.send({ id: 1, name: "hamza", price: 10 });
  return res.send({ msg: "sorry. you need  the correct cookie" }); 
});
module.exports = router;
