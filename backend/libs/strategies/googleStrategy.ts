import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'
import UserModel from '../../models/UserModel';
const GoogleStrategy = passportGoogle.Strategy
const {GOOGLE_CLIENT_ID ,GOOGLE_CLIENT_SECRET} = process.env

export const googleStrategy = new GoogleStrategy({
    clientID: `${GOOGLE_CLIENT_ID}`,
    clientSecret: `${GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://localhost:3001/api/google/callback",
    passReqToCallback:true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const user = await UserModel.findOne({ googleId: profile.id });
    if (!user) {
      const newUser = await UserModel.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0].value,
      });
      if (newUser) {
        done(null, newUser);
      };
    } else {
      done(null, user);
    }
    } catch (error:any) {
      done(error)
    }
  }
);
passport.serializeUser(function(user, done) {
  //@ts-ignore
    done(null, user.id);
  });
  passport.serializeUser(async function(id, done) {
    try {
      const user = await UserModel.findOne({where: { id }})
    if(user){
        done(null,user)
      } 
    } catch (error) {
      done(error,null)
    }
  });