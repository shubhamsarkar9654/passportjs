'use strict'

const GoogleStrategy = require('passport-github2').Strategy;
const knex = require('../db/knex');
const passport = require('passport')

passport.serializeUser((user, done) => {
    done(null, user.githubId);
});

passport.deserializeUser((id, done) => {
    knex('githubUsers')
        .where({githubId: id})
        .then(user => {
            done(null,user);
        })
        .catch(err => {
            console.log(err)
        });
});

passport.use(new GoogleStrategy({
    clientID: 'fd1215b85333030444a7',
    clientSecret: '6a0799cc0d7d397217fea748285968e12aa7591c',           
    callbackURL: 'http://localhost:3000/auth/github/redirect'
    },
    async function(token, tokenSecret, profile, done) {
        //checking in mysql
        await knex('githubUsers')
            .where({githubId:profile.id})
            .then(user => {
                if (user && user.length >0) {
                    return done(null,user[0])  
                } 
                return knex('githubUsers')
                    .insert([{
                        githubId: profile.id,
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


