const mongoose = require('mongoose'),

    chatSchema = mongoose.Schema({
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
    }),

    Chat = mongoose.model('chat', chatSchema);

exports.Chat = Chat


exports.getChat = async chatId => {
    try {
        await mongoose.connect(uri)
        let chat = await Chat.findById(chatId).populate('users')
        mongoose.disconnect()
        return chat
    } catch (err) {
        throw new Error(err)
    }
}