'use strict'

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const knex = require('./db/knex');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const googleStrategy = require('./config/googleConfig');
const githubStrategy = require('./config/githubConfig');
const linkedinStrategy = require('./config/linkedinConfig');


const app = express();
const store = new KnexSessionStore({
	knex,
	tablename: 'sessions'//bydefault also sessions
});

app.use(express.json());
app.use(session({
	secret: 'secret key',
	resave: false,
	saveUninitialied: false,
	store: store
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes);                                                                                                 
app.use(userRoutes);

app.listen(3000,() => {
	console.log('listing through port 3000...')
});
