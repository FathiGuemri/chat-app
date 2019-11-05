const mongoose = require('mongoose'),

    messagesSchema = mongoose.Schema({
        chat: { type: mongoose.Schema.Types.ObjectId, ref: 'chat' },
        content: String,
        sender: String,
        senderImage: String,
        timestamp: Number
    }),

    Message = mongoose.model('message', messagesSchema);
exports.getMessage = async chatId => {
    try {
        await mongoose.connect(uri)
        let messages = await Message.find({ chat: chatId }, null, { sort: { timestamp: 1 } }).populate({
            path: 'chat', // filed,
            model: 'chat', // model
            populate: {
                path: 'users',
                model: 'user',
                select: 'username image'
            }

        })
        mongoose.disconnect()
        return messages
    } catch (err) {
        throw new Error(err)
    }
}

exports.getMessageGroup = async chatId => {
    try {
        await mongoose.connect(uri)
        let messages = await Message.find({ chat: chatId }, null, { sort: { timestamp: 1 } }).populate({
            path: 'chat', // filed,
            model: 'group', // model
            populate: {
                path: 'users',
                model: 'user',
                select: 'username image'
            }
        })
        mongoose.disconnect()
        return messages
    } catch (err) {
        throw new Error(err)
    }
}

exports.newMsg = async msg => {
    try {
        await mongoose.connect(uri)
        msg.timestamp = Date.now()
        let newMsg = new Message(msg)
        await newMsg.save()
        mongoose.disconnect()
        return
    } catch (err) {
        mongoose.disconnect()
        throw Error(err)
    }
}