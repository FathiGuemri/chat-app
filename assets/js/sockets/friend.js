const addBtn = document.getElementById('addBtn'),
    // myId = document.getElementById('myId').value,
    myName = document.getElementById('myName').value,
    myImage = document.getElementById('myImage').value,
    frinedId = document.getElementById('frinedId').value,
    userName = document.getElementById('userName').value,
    userImage = document.getElementById('userImage').value;
addBtn.onclick = (e) => {
    e.preventDefault()
    socket.emit('sendFriendRequest', { myId, myName, myImage, frinedId, userName, userImage })
}
let formREQ = document.getElementById('formREQ')
socket.on('requestSend', () => {
    addBtn.remove()
    formREQ.innerHTML += `
        <input class="btn btn-danger" type="submit" value="Cancel frined" formaction='/friend/cancel'>
    `
})