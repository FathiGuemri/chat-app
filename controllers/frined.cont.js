const userModel = require('../models/user.model');

// exports.add = (req, res) => {
//     userModel.sendFriendRequest(req.body).then(() => {
//         res.redirect('/profile/' + req.body.frinedId )

//     }).catch(err => {
//         res.redirect('/error')
//     })
// }

exports.cancel = (req, res) => {
    userModel.cancelFriendRequest(req.body).then(() => {
        res.redirect('/profile/' + req.body.frinedId )
    }).catch(err => {
        res.redirect('/error')
    })
}

exports.accept = (req, res) => {
    userModel.acceptFriendRequest(req.body).then(() => {
        res.redirect('/profile/' + req.body.frinedId )
    }).catch(err => {
        res.redirect('/error')
    })
}

exports.reject = (req, res) => {
    userModel.rejectFriendRequest(req.body).then(() => {
        res.redirect('/profile/' + req.body.frinedId )
    }).catch(err => {
        res.redirect('/error')
    })
}

exports.delete = (req, res) => {
    userModel.deleteFriendRequest(req.body).then(() => {
        res.redirect('/profile/' + req.body.frinedId )
    }).catch(err => {
        res.redirect('/error')
    })
}