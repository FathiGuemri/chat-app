let cardBox = Array.from(document.getElementsByClassName('card-box'));
socket.emit('getOnlineFriends', document.getElementById('userId').value)


let frnd;
socket.on('onlineFriends', friends => {

    cardBox.forEach(ele => {

        if (friends.find(f => f.id == ele.id)) {
            document.getElementById(ele.id).classList.add('online')
        } else {
            document.getElementById(ele.id).classList.add('offline-f')
        }
    });

})