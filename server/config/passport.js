const passport = require('passport')
const User = require('../auth/users')
const bcrypt = require('bcryptjs')
const localStrategy = require('passport-local')

const GoogleStrategy = require('passport-google-oauth20').Strategy

// client id
// 1093781711183-li3emkltsh1p1lo43iu6rtmuvsiuord8.apps.googleusercontent.com
// client secret
// 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

passport.use(new localStrategy({
            usernameField: 'email'
        },
        function(email, password, done){
            User.findOne({email}).then(user => {
                if (!user || !user.password) {
                    return done(null, false)
                }
                else bcrypt.compare(password, user.password, function(err, result) {
                        if(err){
                            return done(err)
                        }
                        if(result){
                            return done(null, user)
                        }
                    })
            }).catch(e => {return done(e)})
        }
    )
)

// https://console.cloud.google.com/apis/credentials?project=kinopoisk-430723   google cloud
passport.use(new GoogleStrategy({
    clientID: '1093781711183-li3emkltsh1p1lo43iu6rtmuvsiuord8.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://kinopoisk-node-js.onrender.com/api/auth/google",
    scope: ['openid', 'email', 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    let user = await User.findOne({ email: profile.emails[0].value })
    console.log(user)
      if (!user) {
        user = await new User({
          full_name: profile.displayName,
          email: profile.emails[0].value,
          isAdmin: false
        }).save();
      }
      return cb(null, user);
  }
))

passport.serializeUser(function(user, done){
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    User.findById(id).then((user) => {
        done(null, user)
    })
})
