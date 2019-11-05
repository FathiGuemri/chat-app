const mongoose = require('mongoose'),
        User = require('./user.model').User,
        bcrypt = require('bcrypt');


exports.addUser = (username, email, pass, image)  => {
    return new Promise((resolve, reject) => {
        mongoose.connect(uri).then(() => {
         return User.findOne({email: email}).then(user => {
               if (user) {
                   mongoose.disconnect()
                   reject('email is exist')
               }else {
                   return bcrypt.hash(pass, 10)
               }
           }).then(passHash => {
               let user = new User({username, email, password: passHash, image})
               return user.save()
           })
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
} 

exports.authLogin = (email, password) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(uri).then(() => {
            return User.findOne({email: email}).then(user => {
                    if (user) {
                        bcrypt.compare(password, user.password).then(same => {
                            if (!same) {
                                mongoose.disconnect()
                                reject('password is incorrect')
                            } else {
                                mongoose.disconnect()
                                resolve({
                                userId: user._id,
                                username: user.username,
                                image: user.image
                            })
                            }
                        })
                    } else {
                        mongoose.disconnect()
                        reject('email no exist plzz create account')
                    }
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
        })
    })
}

exports.logOut = id => {
        return new Promise((resolve, reject) => {
            mongoose.connect(uri).then(() => {
                return User.findByIdAndUpdate(id, {isOnline: false})
            }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            }) 
        })
}

