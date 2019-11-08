const router = require('express').Router(),
    authGuard = require('./auth.gaurd'),
    friendsCont = require('../controllers/frisnds.cont');

router.get('/', friendsCont.getFriends)


module.exports = router