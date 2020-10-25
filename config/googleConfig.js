'use strict'

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const knex = require('../db/knex');
const passport = require('passport');

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
    knex('googleUsers')
        .where({googleId: id})
        .then(user => {  
            done(null,user);
        })
        .catch(err => {
            console.log(err)
        });
});

passport.use(new GoogleStrategy({
    clientID: '853298904899-nfg8qgvm2n3bkupdnlt206nfk1j3nf1v.apps.googleusercontent.com',
    clientSecret: 'X5gcKzxbjTk9vv2Iwo4XVnkZ',           
    callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    async function(token, tokenSecret, profile, done) {
        //checking in mysql
        await knex('googleUsers')
            .where({googleId:profile.id})
            .then(user => {
                if (user && user.length >0) {
                    return done(null,user[0])  
                } 
                return knex('googleUsers')
                    .insert([{
                        googleId: profile.id,
                        name: profile.name.givenName,
                        username: profile.displayName,
                        profilePhoto: profile.photos[0].value
                    }])
                    .then(user => {
                        console.log('user created ...')
                        return done(null,user)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }
));                                                                                               


