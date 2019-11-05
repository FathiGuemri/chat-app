const router = require('express').Router(),
      homeCont = require('../controllers/home.cont')
      authGaurd = require('./auth.gaurd')

router.get('/', authGaurd.isUser, homeCont.getHome)
module.exports = router