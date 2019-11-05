const mongoose = require('mongoose');

let groubSchema = mongoose.Schema({
    name: String,
    image: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
})

let Group = mongoose.model('group', groubSchema)


exports.newGroup = async data => {
    try {
        await mongoose.connect(uri)

        let group = new Group(data)

        await group.save()
        await mongoose.disconnect()
        return
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}

exports.getChatGroup = async chatId => {
    try {
        await mongoose.connect(uri)
        let group = await Group.findById(chatId).populate('users')
        mongoose.disconnect()
        return group
    } catch (err) {
        throw new Error(err)
    }
}

exports.getAllGroups = async() => {
    try {
        await mongoose.connect(uri)
        let groups = await Group.find()
        await mongoose.disconnect()
        return groups
    } catch (err) {
        throw new Error(err)
    }
}