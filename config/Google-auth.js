const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/v1/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        
        try {
            const user = await User.findOne({googleId: profile.id})
            if(user){
                return done(null, user)
            }else{
                const newUser = new User({
                    familyName: profile.name.familyName,
                    lastName: profile.name.givenName,
                    fullName: profile.displayName,
                    googleId: profile.id,
                    photo: profile.photos[0].value
                })
                await newUser.save()
                return done(null, newuser)
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    ))
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}