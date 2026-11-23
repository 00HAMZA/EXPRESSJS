const passport = require("passport");
const { Strategy } = require("passport-local");
const user = require("../mongoose/user");
const comparepassword = require("../../utils/helpers");
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const finduser = await user.findById(id);
    if (!finduser) throw new Error("user not found !!");
    done(null, finduser);
  } catch (err) {
    done(err, null);
  }
});
passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await user.findOne({ username });
      if (!findUser) throw new Error("user not found");
      if (!comparepassword(password, findUser.password))
        throw new Error("Bad credentiales");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  }),
);
module.exports = passport;
