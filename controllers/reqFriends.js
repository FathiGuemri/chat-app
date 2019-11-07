const userModel = require('../models/user.model')
module.exports = (req, res, next) => {
    let id = req.params.id
    userModel.getUserData(req.session.userId).then(data => {
        req.reqFriendsData = {
            userName: data.username,
            userImage: data.image,
            frinedId: data._id,
            isOwner: id === req.session.userId,
            isFrendes: data.freindes.find(frined => frined.id === req.session.userId),
            isFrendesReq: data.friendRequsets.find(frinedReq => frinedReq.id === req.session.userId),
            isFrendesSendReq: data.sendRequsets.find(FrendesSendReq => FrendesSendReq.id === req.session.userId),
        }
        next()
    })
}