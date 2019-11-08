const authModel = require('../models/auth.model'),
    validationResult = require('express-validator').validationResult,
    multer = require('multer'),
    bodyParser = require('body-parser');
let msgErr
exports.singup = (req, res) => {
    res.render('singup',
        {
            title: 'singup',
            vadidationErr: req.flash('authMsgErr'),
            authErr: req.flash('authErr'),
            isConnect: req.session.userId
        })

}


exports.postSingup = (req, res) => {
            let filename;
            if (typeof req.file === "undefined") {
                filename = 'defaulte-image-user.png'
            } else {
                filename = req.file.filename
            }
            if (validationResult(req).isEmpty()) {
                authModel.addUser(
                    req.body.username,
                    req.body.email,
                    req.body.password,
                    filename
                ).then(() => {
                    res.redirect('/login')
                }).catch(err => {
                    req.flash('authErr', err)
                    res.redirect('/singup')
                })

            } else {
                req.flash('authMsgErr', validationResult(req).array())
                res.redirect('/singup')
            }
    
}
exports.login = (req, res) => {
    res.render('login', {
        title: 'login',
        isConnect: req.session.userId,
        loginErrMsg: req.flash('loginErrMsg'),
        loginErr: req.flash('loginErr'),
    })

}

exports.postLogin = (req, res) => {
    if (validationResult(req).isEmpty()) {
        authModel.authLogin(req.body.email, req.body.password).then(result => {
            req.session.userId = String(result.userId)
            req.session.name = result.username
            req.session.image = result.image
            res.redirect('/')

        }).catch(err => {
            req.flash('loginErr', err)
            res.redirect('/login')
        })
    } else {
        req.flash('loginErrMsg', validationResult(req).array())
        res.redirect('/login')
    }
}
exports.logout = (req, res) => {
    authModel.logOut(req.session.userId).then(() => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }).catch(err => {
        console.log(err)
        res.redirect('/')
    })
    
    
}

