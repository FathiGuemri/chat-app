const router = require('express').Router(),
    authGuard = require('./auth.gaurd'),
    chatCont = require('../controllers/chat.cont');

router.get('/:id', authGuard.isUser, chatCont.getChat)
router.get('/group/:id', authGuard.isUser, chatCont.getChatGroup)
module.exports = router