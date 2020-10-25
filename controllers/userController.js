'use strict'

const userController = require('../controllers/userController')
const knex = require('../db/knex')


const profile = (req,res) => {
	if (!req.session.passport) {
		return res.redirect('/profile')
	}
	knex.select()
		.from('googleUsers','githubUsers')
        .then(user => {	
			console.log(user)
            res.send(`hello ${user[0].name}`)
        })
        .catch(err => {
            console.log(err)
    });
}

module.exports = {profile}