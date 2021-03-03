/* eslint-disable no-underscore-dangle */
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createUser, findUser } from '../services/userService';

const { CLIENT_ID, CLIENT_SECRET, CB_URL } = process.env;

export default (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CB_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile._json.email,
          password: '123abc',
          role: 'user',
        };

        try {
          let user = await findUser({ email: newUser.email });
          if (user) {
            done(null, user);
          } else {
            user = await createUser(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => done(null, user.id));
};

// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { config } from 'dotenv';
// import { socialAuth } from '../controllers/userController';

// config();
// passport.serializeUser((user, done) => done(null, user));

// const { CLIENT_ID, CLIENT_SECRET, CB_URL } = process.env;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       callbackURL: CB_URL,
//     },
//     (token, tokenSecret, profile, done) => {
//       //   User.findOrCreate({ googleId: profile.id }, (err, user) => {
//       //     return done(err, user);
//       //   });
//       socialAuth(profile);
//       console.log({ profile });
//     },
//   ),
// );
