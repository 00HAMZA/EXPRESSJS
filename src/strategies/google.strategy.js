const passport = require("passport");
const user = require("../mongoose/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
    
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            console.log("client id : ", process.env.GOOGLE_CLIENT_ID)
            let user = await user.findOne({googleId : profile.id});
            if(!user){
                user = await user.create({
                    googleId : profile.id,
                    username : profile.displayname,
                    email : profile.email?.[0]?.value,
                    picture : profile.photos?.[0]?.value 
                })
            }
            done(null, user)
        }catch(err){
            done(err)
        }
    },
  ),
);

module.exports = passport;
