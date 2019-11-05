const groubModel = require('../models/group-chat.model'),
    userModel = require('../models/user.model')

exports.getCreateGroupForm = (req, res) => {

    userModel.getFriends(req.session.userId).then(friends => {

        res.render('create-group', {
            title: 'Create Group',
            isConnect: req.session.userId,
            friendsRequests: req.friendsRequests,
            friends
        })
    })
}

exports.createGroup = async(req, res) => {
    let groupFriends = [],
        groupName = req.body.groupName,
        groupImage = req.file.filename;

    groupFriends.push(req.session.userId)

    await userModel.getFriends(req.session.userId).then(friends => {
        friends.forEach(friend => {
            groupFriends.push(req.body[friend.id])
        });
    })

    await groubModel.newGroup({
        name: groupName,
        image: groupImage,
        users: groupFriends

    }).then(() => {
        res.redirect('/groups')
    })
    return
}
exports.getGroups = (req, res) => {
    groubModel.getAllGroups().then(groups => {
        res.render('groups', {
            title: 'groups',
            isConnect: req.session.userId,
            groups,
            friendsRequests: req.friendsRequests
        })
    })
}