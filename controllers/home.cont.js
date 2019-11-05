exports.getHome = (req, res, next) => {
    res.render('index', {title: 'home', isConnect: req.session.userId, friendsRequests: req.friendsRequests})
}