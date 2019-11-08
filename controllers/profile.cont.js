const userModel = require('../models/user.model')


exports.redirect = (req, res) => {
    res.redirect('/profile/' + req.session.userId)
}

exports.getProfile = (req, res) => {
    let id = req.params.id
    userModel.getUserData(id).then(data => {
        res.render('profile', {
            title: req.session.name,
            isConnect: req.session.userId,
            myId: req.session.userId,
            myName: req.session.name,
            myImage: req.session.image,
            friendsRequests: req.friendsRequests,
            userName: data.username,
            userImage: data.image,
            userEmail: data.email,
            frinedId: data._id,
            isOwner: id === req.session.userId,
            isFrendes: data.freindes.find(frined => frined.id === req.session.userId),
            isFrendesReq: data.friendRequsets.find(frinedReq => frinedReq.id === req.session.userId),
            isFrendesSendReq: data.sendRequsets.find(FrendesSendReq => FrendesSendReq.id === req.session.userId),
            myfreindes: data.freindes
        })
    })

}