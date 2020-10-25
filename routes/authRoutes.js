'use strict'

const passport = require('passport');
const router = require('express').Router();


// auth with google+
router.get('/google', passport.authenticate('google', {scope: ['profile']}));
router.get('/google/callback', passport.authenticate('google',{
	session:true,
	successRedirect:'/profile',
	failureRedirect: '/auth/google/failure'
}));

// auth with github
router.get('/github', passport.authenticate('github', {scope: ['profile']}));
router.get('/github/redirect', passport.authenticate('github',{
	session:true,
	successRedirect:'/profile',
	failureRedirect: '/auth/github/failure'
}));

module.exports = router
