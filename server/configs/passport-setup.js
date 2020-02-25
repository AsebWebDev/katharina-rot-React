const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require("../models/User")

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user)
    }).catch(err => console.log(err))
})

passport.use(
    new GoogleStrategy({
        // options for the googe strategy
        callbackURL: 'http://localhost:5000/api/oauth/google/redirect',
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        User.findOne({googleId: profile.id})
        .then((currentUser) => {
            if (currentUser) {
                console.log('user is: ' + currentUser)
                done(null, currentUser);
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                })
                .save()
                .then((newUser) => {
                    console.log('new user created: ' + newUser)
                    done(null, newUser);
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
        
    })
)