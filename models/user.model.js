const mongoose = require('mongoose');

const Chat = require('./chat.model').Chat
let userSchime = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: { type: String, default: 'defaulte-image-user.png' },
    freindes: {
        type: [{ name: String, image: String, id: String, chatId: String }],
        default: []
    },
    friendRequsets: {
        type: { name: String, id: String },
        default: []
    },
    sendRequsets: {
        type: { name: String, id: String },
        default: []
    }
})

let User = mongoose.model('user', userSchime)
exports.User = User

exports.getUserData = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(uri).then(() => {
            return User.findById(id)
        }).then(data => {
            mongoose.disconnect()
            resolve(data)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.sendFriendRequest = async(data) => {
    try {
        await mongoose.connect(uri)
        await User.updateOne({ _id: data.frinedId }, {
            $push: { friendRequsets: { name: data.myName, id: data.myId } }
        })
        await User.updateOne({ _id: data.myId }, {
            $push: { sendRequsets: { name: data.userName, id: data.frinedId } }
        })
        mongoose.disconnect()
        return
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err);
    }
}

exports.cancelFriendRequest = async(data) => {
    try {
        await mongoose.connect(uri)
        await User.updateOne({ _id: data.frinedId }, {
            $pull: { friendRequsets: { id: data.myId } }
        })
        await User.updateOne({ _id: data.myId }, {
            $pull: { sendRequsets: { id: data.frinedId } }
        })
        mongoose.disconnect()
        return
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err);
    }
}

exports.acceptFriendRequest = async(data) => {
    try {
        await mongoose.connect(uri)
        await User.updateOne({ _id: data.myId }, {
            $pull: { friendRequsets: { id: data.frinedId } }
        })
        await User.updateOne({ _id: data.frinedId }, {
            $pull: { sendRequsets: { id: data.myId } }
        })
        let newChat = new Chat({
            users: [data.myId, data.frinedId]
        })
        let chatDoc = await newChat.save()
        await User.updateOne({ _id: data.frinedId }, {
            $push: { freindes: { name: data.myName, image: data.myImage, id: data.myId, chatId: chatDoc._id } }
        })
        await User.updateOne({ _id: data.myId }, {
            $push: { freindes: { name: data.userName, image: data.userImage, id: data.frinedId, chatId: chatDoc._id } }
        })
        mongoose.disconnect()
        return
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err);
    }
}

exports.rejectFriendRequest = async(data) => {
    try {
        await mongoose.connect(uri)
        await Promise.all([
            User.updateOne({ _id: data.myId }, {
                $pull: { friendRequsets: { id: data.frinedId } }
            }),
            User.updateOne({ _id: data.frinedId }, {
                $pull: { sendRequsets: { id: data.myId } }
            })
        ])

        mongoose.disconnect()
        return
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err);
    }
}

exports.deleteFriendRequest = async(data) => {
    try {
        await mongoose.connect(uri)
        await User.updateOne({ _id: data.myId }, {
            $pull: { freindes: { id: data.frinedId } }
        })
        await User.updateOne({ _id: data.frinedId }, {
            $pull: { freindes: { id: data.myId } }
        })
        mongoose.disconnect()
        return
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err);
    }
}

exports.getFriendsRequests = async id => {
    try {
        await mongoose.connect(uri)
        let data = await User.findById(id, { friendRequsets: true })
        return data.friendRequsets
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}


exports.getFriends = async id => {
    try {
        await mongoose.connect(uri)
        let data = await User.findById(id, { freindes: true })
        return data.freindes
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}

exports.getallFriends = async() => {
    try {
        await mongoose.connect(uri)
        let data = await User.find()
        return data
    } catch (err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}