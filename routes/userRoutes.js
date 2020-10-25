'use strict'

const express = require('express')

const userController = require('../controllers/userController')
const isUserLoggedIn = require('../middleware/isUserLoggedIn')


const router = express.Router()

router.get('/profile',isUserLoggedIn,userController.profile)

module.exports = router
