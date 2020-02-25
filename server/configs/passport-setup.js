const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//FIXME: Use process.env instead of keys
const keys = require('./keys')
const User = require("../models/User")

passport.use(
    new GoogleStrategy({
        // options for the googe strategy
        callbackURL: 'http://localhost:5000/api/oauth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
        // clientID: process.env.GOOGLE_CLIENTID,
        // clientSecret: process.env.GOOGLE_CLIENTSECRET
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        User.findOne({googleId: profile.id})
        .then((currentUser) => {
            if (currentUser) {
                console.log('user is: ' + currentUser)
            } else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                })
                .save()
                .then((newUser) => {
                    console.log('new user created: ' + newUser)
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
        
    })
)