const express = require('express'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    http = require('http'),
    path = require('path'),
    SocketIO = require('socket.io'),
    session = require('express-session'),
    SessionStoer = require('connect-mongodb-session')(session),


    app = express(),
    server = http.createServer(app),
    io = SocketIO(server),

    homeRouter = require('./routers/home.router'),
    authRouter = require('./routers/auth.router'),
    profileRouter = require('./routers/profile.router'),
    frinedRouter = require('./routers/frined.router'),
    frinedsRouter = require('./routers/friends.router'),
    chatRouter = require('./routers/chat.router'),
    groupRouter = require('./routers/group.router'),
    groupsRouter = require('./routers/groups.router'),
    getFriendsRequests = require('./models/user.model').getFriendsRequests;

io.onlineUsers = {}

require('./sockets/freind.socket')(io)
require('./sockets/init.soket')(io)
require('./sockets/chat.socket')(io)


global.uri = 'mongodb://uszkqwtlvpy39azkpjm8:zDX9gg20eiFmXwkNGMYY@bq90cg3au49x6hv-mongodb.services.clever-cloud.com:27017/bq90cg3au49x6hv'




app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))
app.use(flash())

let STORE = new SessionStoer({
    uri: uri,
    collection: 'session'
})

app.use(session({
    secret: 'my secret session stor app chat ... ftouh',
    saveUninitialized: false,
    store: STORE
}))
app.set('view engine', 'pug')
app.use((req, res, next) => {
    if (req.session.userId) {
        getFriendsRequests(req.session.userId).then(requests => {
            req.friendsRequests = requests;
            next()
        }).catch(err => res.redirect('/error'))
    } else {
        next()
    }
})

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/profile', profileRouter)
app.use('/friend', frinedRouter)
app.use('/friends', frinedsRouter)
app.use('/chat', chatRouter)
app.use('/create-group', groupRouter)
app.use('/groups', groupsRouter)



app.use((req, res, next) => {
    res.render('not-found', {
        isUser: req.session.userId,
        friendsRequests: req.friendsRequests,
        title: 'not-found'
    })
})
let port = process.env.PORT || 3000
server.listen(port, (err) => {
    try {
        console.log('server raning')
    } catch (err) {
        console.log(err)
    }
})