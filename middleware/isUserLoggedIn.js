'use strict'

const isUserLoggedIn = (req,res,next) => {
    if (!req.session) {
        return res.send('You are not authenticate')
    }
    return next()
}

module.exports = isUserLoggedIn