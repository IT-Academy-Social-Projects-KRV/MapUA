// import { Strategy as FacebookStrategy } from "./../passport";
// import UserModel from "../../models/UserModel";
// import { v4 as uuidv4 } from "uuid";

// const facebookStrategy = new FacebookStrategy(
//   {
//     clientID: `${process.env.FACEBOOK_APP_ID}`,
//     clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
//     callbackURL: `${process.env.HOST_URI}/api/signin/facebook/callback`,
//     profileFields: ["id", "emails", "name", "picture.type(large)"],
//   },
//   async (accessToken:any, refreshToken:any, profile:any, done:any) => {
//     try {
//       console.log("profile", profile);
//       const email = profile?.emails?.[0].value;
//       let user = null;

//       if (email) {
//         user = await UserModel.findOne({ email });

//         if (!user) {
//           user = await UserModel.create({
//             email,
//             displayName: `${profile.name?.givenName} ${profile.name?.familyName}`,
//             imageUrl: profile?.photos?.[0]?.value ?? "",
//             passwordHash: uuidv4(),
//           });
//         }

//         done(null, user);
//       } else {
//         done(null, false, {
//           message:
//             "We cannot login via facebook as you didn't provide your email",
//         });
//       }
//     } catch (err) {
//       done(err);
//     }
//   }
// );

// export default facebookStrategy;
