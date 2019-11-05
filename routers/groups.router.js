const router = require('express').Router(),
    groupsCont = require('../controllers/group-cont')

router.get('/', groupsCont.getGroups)


module.exports = router