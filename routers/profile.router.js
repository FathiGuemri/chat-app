const   router = require('express').Router(),
        authGaurd = require('./auth.gaurd'),
        profileCont = require('../controllers/profile.cont');

router.get('/', authGaurd.isUser,  profileCont.redirect);

router.get('/:id', profileCont.getProfile);
 



module.exports = router