const router = require('express').Router(),
    boodyParser = require('body-parser').urlencoded({ extended: true }),

    authGuard = require('./auth.gaurd'),
    frinedCont = require('../controllers/frined.cont');

router.post('/cancel', authGuard.isUser, boodyParser, frinedCont.cancel)

router.post('/accept', authGuard.isUser, boodyParser, frinedCont.accept)

router.post('/reject', authGuard.isUser, boodyParser, frinedCont.reject)

router.post('/delete', authGuard.isUser, boodyParser, frinedCont.delete)



module.exports = router