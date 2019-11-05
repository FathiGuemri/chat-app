const { sendFriendRequest, getFriends } = require('../models/user.model')
module.exports = io => {
    io.on('connection', socket => {
        socket.on('sendFriendRequest', data => {
            sendFriendRequest(data).then(() => {

                socket.emit('requestSend')

                io.to(data.frinedId).emit('newFriendReq', { name: data.myName, id: data.myId })
            }).catch((err) => {
                socket.emit('reqfailed')
            })
        })
        socket.on('getOnlineFriends', id => {
            getFriends(id).then(friends => {
                let onlineFriends = friends.filter(friend => io.onlineUsers[friend.id])
                socket.emit('onlineFriends', onlineFriends)
            }).catch(err => console.log(err))

        })
    })
}