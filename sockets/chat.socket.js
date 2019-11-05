const { newMsg, getMessage } = require('../models/message.model')

module.exports = io => {
    io.on('connection', socket => {
        socket.on('joinChat', chatId => {
            socket.join(chatId)
        })
        socket.on('sendMessage', async(msg, cb) => {

            newMsg(msg).then(() => {
                io.to(msg.chat).emit('newMessage', msg)
                cb()
            })

        })
        socket.on('reqPeerId', chatId => {
            socket.broadcast.to(chatId).emit('getPeerId')
        })

        socket.on('sendPeerId', data => {
            socket.broadcast.to(data.chatId).emit('recievePeerId', data.peerId)
        })
    })
}