const router = require('express').Router(),
    authGuard = require('./auth.gaurd'),
    friendsCont = require('../controllers/frisnds.cont')

router.get('/', authGuard.isUser, friendsCont.getFriends)


module.exports = router