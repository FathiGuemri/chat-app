const chatModel = require('../models/chat.model'),
    messageModel = require('../models/message.model'),
    groupChatModel = require('../models/group-chat.model');

exports.getChat = (req, res) => {
    let chatId = req.params.id
    messageModel.getMessage(chatId).then(messages => {

        if (messages.length === 0) {
            chatModel.getChat(chatId).then(chat => {
                let friendData = chat.users.find(user => user._id != req.session.userId)
                res.render('chat', {
                    title: friendData.username,
                    isConnect: req.session.userId,
                    friendsRequests: req.friendsRequests,
                    messages,
                    myImage: req.session.image,
                    friendData,
                    name: friendData.username,
                    image: friendData.image,
                    chatId,
                })
            })
        } else {
            let friendData = messages[0].chat.users.find(user => user._id != req.session.userId)
            res.render('chat', {
                title: friendData.username,
                isConnect: req.session.userId,
                friendsRequests: req.friendsRequests,
                messages,
                myImage: req.session.image,
                friendData,
                name: friendData.username,
                image: friendData.image,
                chatId,
            })
        }
    })
}


exports.getChatGroup = (req, res) => {
    let chatId = req.params.id
    messageModel.getMessageGroup(chatId).then(messages => {

        groupChatModel.getChatGroup(chatId).then(group => {
            if (messages.length === 0) {
                let friendData = group.users.filter(user => user._id != req.session.userId)



                res.render('chat', {
                    title: friendData.username,
                    isConnect: req.session.userId,
                    friendsRequests: req.friendsRequests,
                    messages,
                    myImage: req.session.image,
                    friendData,
                    name: group.name,
                    image: group.image,
                    chatId,
                })

            } else {
                let friendData = messages[0].chat.users.find(user => req.session.userId == user._id)

                res.render('chat', {
                    title: friendData.username,
                    isConnect: req.session.userId,
                    friendsRequests: req.friendsRequests,
                    messages,
                    myImage: req.session.image,
                    friendData: friendData,
                    name: group.name,
                    image: group.image,
                    chatId,
                })
            }
        })
    })
}