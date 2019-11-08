const router = require('express').Router(),
    check = require('express-validator').check,
    multer = require('multer'),
    bodyParsre = require('body-parser'),
    authCont = require('../controllers/auth.cont'),
    authGaurd = require('./auth.gaurd');


router.get('/singup', authGaurd.isConect, authCont.singup)
router.get('/login', authGaurd.isConect, authCont.login)

router.post('/singup', authGaurd.isConect,  
    multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    
                        cb(null, 'images')
                
                },
                filename : (req, file, cb) => {
                
                        cb(null, Date.now() + '-' + file.originalname)
                    
                }
            })
        }).single('image'),
    check('username').not().isEmpty().withMessage('username is required'),
    check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('invaled format email'),
    check('password').not().isEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('At least 8 characters and 1 digit'),
    check('confermPassword').custom((value, { req }) => {
        if (value === req.body.password) return true;
        else throw 'password dont equal'
    }),
    authCont.postSingup )

router.post('/login', authGaurd.isConect, bodyParsre.urlencoded({ extended: true }),
    check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('invaled format email'),
    check('password').not().isEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('At least 8 characters and 1 digit'),
   

    authCont.postLogin)

router.all('/logout', authCont.logout)

module.exports = router