let chatId = document.getElementById('chatId').value,
    msg = document.getElementById('message'),
    send = document.getElementById('send'),
    msgContainer = document.getElementById('msg-container'),
    friendImage = document.getElementById('friendImage').value;
myImage = document.getElementById('myImage').value;
msgContainer.scrollTop = msgContainer.scrollHeight
socket.emit('joinChat', chatId)

send.onclick = function() {
    let content = msg.value
    socket.emit('sendMessage', { chat: chatId, content, sender: myId, senderImage: myImage }, () => {
        msg.value = ''
        msgContainer.scrollTop = msgContainer.scrollHeight
    })
}
socket.on('newMessage', msgs => {
    if (msgs.sender == myId) {
        msgContainer.innerHTML += `
        <div id="msg" class="d-flex justify-content-end mb-4">
            <div class="msg_cotainer_send">${msgs.content}</div>
            <div class="img_cont_msg">
                <img class="rounded-circle user_img_msg" src="/${myImage}">
            </div>
        </div>
    `
    } else {
        msgContainer.innerHTML += `
        <div id="msg" class="d-flex justify-content-start mb-4">
            <div class="img_cont_msg">
                <img class="rounded-circle user_img_msg" src="/${msgs.senderImage}">
            </div>
            <div class="msg_cotainer">${msgs.content}</div>
        </div>
    `
    }
    msgContainer.scrollTop = msgContainer.scrollHeight

})

socket.emit('getOnlineFriends', document.getElementById('userId').value)

socket.on('onlineFriends', freinds => {
    let div = document.getElementById('onlineFriends')
    if (freinds.length === 0) {
        div.innerHTML = `
            <p class="lead text-danger">No Online Frineds </p>
        `
    } else {
        let html = `
            <ui class="contacts w-100" > 
        `
        for (let freind of freinds) {
            html += `
            <li class="active">
                <a href="/chat/${freind.chatId}" class="d-flex bd-highlight">
                    <div class="img_cont"><img class="rounded-circle user_img" src="/${freind.image}" /><span class="online_icon"></span></div>
                    <div class="user_info"><span>${freind.name}</span>
                    <p>${freind.name} is online</p>
                    </div>
                    </a>
            </li>
            `
        }
        html += '</ui>'
        div.innerHTML = html
    }
})


let callbtn = document.getElementById('callBtn'),
    myVideo = document.getElementById('myVideo'),
    videoFriend = document.getElementById('videoFriend'),
    openCall = document.getElementById('openCall'),
    callVideo = document.getElementById('call-video');

let peer = new Peer()
let peerId;

peer.on('open', id => {
    peerId = id
    console.log('my id ', id)
})


callbtn.onclick = () => {
    socket.emit('reqPeerId', chatId)
}


socket.on('getPeerId', () => {
    socket.emit('sendPeerId', {
        chatId,
        peerId
    })
    document.getElementById('modal').click()
})

socket.on('recievePeerId', id => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(strm => {
        let call = peer.call(id, strm)
        call.on('stream', call.on('stream', stream => {
            return showVideoCall(stream)
        }))
    }).catch(err => console.log(err))
})
openCall.onclick = () => {
    peer.on('call', call => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(strm => {
            call.answer(strm)
            call.on('stream', stream => {
                return showVideoCall(stream)
            })
        }).catch(err => console.log(err))

    })
}




function showVideoCall(stream) {
    videoFriend.srcObject = stream
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
        myVideo.srcObject = stream
    })
    videoFriend.play()
    myVideo.play()
    callVideo.style.display = 'block'
}