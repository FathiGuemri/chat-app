exports.isConect = (req, res, next) => {
    if (!req.session.userId) next() 
    else {
        res.render('error', {title: 'error', err: 'you are connected'})
    }
}

exports.isUser = (req, res, next) => {
    if (req.session.userId) next() 
    else {
        res.redirect('/login')
    }
}