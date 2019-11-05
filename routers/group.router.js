const router = require('express').Router(),
    groubCont = require('../controllers/group-cont'),
    multer = require('multer')


router.get('/', groubCont.getCreateGroupForm)

router.post('/', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('groupImage'), groubCont.createGroup)


module.exports = router