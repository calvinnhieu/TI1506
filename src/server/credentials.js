var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    consumerKey: '638829096835-3m5fvrbsgmiui8bldbfcdgacnc90hm4j.apps.googleusercontent.com',
    consumerSecret: '17P4_hHWeHIe5NNMG2ji-el_',
    callbackURL: "http://127.0.0.1:3000/authsuccess"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
