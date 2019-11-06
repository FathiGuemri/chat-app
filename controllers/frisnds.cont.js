const userModel = require('../models/user.model')

exports.getFriends = (req, res) => {
    userModel.getallFriends().then(friends => {
        res.render('friends', { friends, title: 'friends', isConnect: req.session.userId, friendsRequests: req.friendsRequests })
    })
}