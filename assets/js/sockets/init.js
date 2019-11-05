const socket = io()
let dropdownToggle = document.getElementById('dropdown-toggle')
let myId = document.getElementById('userId').value


socket.on('connect', () => {
    socket.emit('joinNotficationRoom', myId)
    socket.emit('goOnline', myId)
})

socket.on('newFriendReq', data => {
    let friendReq = document.getElementById('friendReq')
    let reqIndex = +document.getElementById('reqIndex').value + 1

    let span = friendReq.querySelector('span');
    if (span) span.remove()
    friendReq.innerHTML += `
        <a class="dropdown-item" href='/profile/${data.id}'> ${data.name} </a>
    `
    dropdownToggle.classList.add('animated')
    dropdownToggle.classList.add('flash')
    dropdownToggle.classList.add('infinite')
    dropdownToggle.innerHTML += `<b>${reqIndex}</b>`
   

})
dropdownToggle.onclick = () => {
        dropdownToggle.classList.remove('animated')
        dropdownToggle.classList.remove('flash')
        dropdownToggle.classList.remove('infinite')
    }