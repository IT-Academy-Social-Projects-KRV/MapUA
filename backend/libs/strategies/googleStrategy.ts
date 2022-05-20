// import passportGoogle from 'passport-google-oauth20'
// import passport from 'passport'
// import UserModel from '../../models/UserModel';
// import { v4 as uuidv4 } from "uuid";
// const GoogleStrategy = passportGoogle.Strategy
// const {GOOGLE_CLIENT_ID ,GOOGLE_CLIENT_SECRET, HOST_URI} = process.env

// export const googleStrategy = new GoogleStrategy({
//     clientID: `${GOOGLE_CLIENT_ID}`,
//     clientSecret: `${GOOGLE_CLIENT_SECRET}`,
//     callbackURL: `${HOST_URI}/api/google/callback`,
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       const user = await UserModel.findOne({ googleId: profile.id });
//     if (!user) {
//       const newUser = await UserModel.create({
//         googleId: profile.id,
//         displayName: profile.displayName,
//         email: profile.emails?.[0].value,
//         imageUrl: profile?.photos?.[0]?.value ?? '',
//         passwordHash: uuidv4(),
//       });
//       if (newUser) {
//         done(null, newUser);
//       };
//     } else {
//       done(null, user);
//     }
//     } catch (error:any) {
//       done(error)
//     }
//   }
// );