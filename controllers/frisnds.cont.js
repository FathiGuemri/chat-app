const userModel = require('../models/user.model')

exports.getFriends = (req, res) => {
    userModel.getFriends(req.session.userId).then(friends => {
        res.render('friends', { friends, title: 'friends', isConnect: req.session.userId, friendsRequests: req.friendsRequests })
    })
}