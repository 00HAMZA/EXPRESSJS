const passport = require("passport");
const { Strategy } = require("passport-local");
const mockUsers = require("../../data/mockusers");
const user = require("../mongoose/user");

passport.serializeUser((user, done) => {
  console.log("inside srialize user");
  console.log(user);
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  console.log("inside deserialize user.");
  console.log("deserialize user id : ",id);
  try {
    const finduser = await user.findById(id);
    if (!finduser) throw new Error("user not found !!");
    done(null, finduser);
    console.log("the founded user :", finduser);
  } catch(err) {
    done(err, null);
  }
});
passport.use(
  new Strategy(async (username, password, done) => {
    console.log("ussername :", username);
    console.log("password : ", password);
    try {
      const findUser = await user.findOne({username});
      console.log("look here : ", findUser, "/////////////")
      if(!findUser) throw new Error("user not found");
      if(findUser.password !== password) throw new Error("Bad credentiales");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  }),
);
module.exports = passport;
