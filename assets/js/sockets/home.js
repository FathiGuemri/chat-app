socket.emit('getOnlineFriends', document.getElementById('userId').value)

socket.on('onlineFriends', freinds => {
    document.getElementById('olne-fnds').innerText = freinds.length
    let div = document.getElementById('onlineFriends')
    if (freinds.length === 0) {
        div.innerHTML = `
            <p class="lead alert alert-danger">No Online Frineds </p>
        `
    } else {
        let html = `
            <div class="list-group" > 
        `
        for (let freind of freinds) {

            html += `
            <button type="button" class="list-group-item">
                <div class="text-center">
                    <div class="">
                        <div class="ml-3 thumb-lg member-thumb float-left"><img src="/${freind.image}" class="rounded-circle img-thumbnail" alt="profile-image"></div>
                        <div class="float-right w-75 pt-2">
                            <h4 class="pt-2 float-left"><a class="text-dark" href="/profile/${freind.id}"> ${freind.name}</a></h4>
                            <a href="/chat/${freind.chatId}" class="btn btn-success btn-sm float-right waves-effect w-md waves-light">go to chat</a>
                            <div class=clearfix></div>
                        </div>
                        <div class=clearfix></div>
                    </div>
                </div>
            </button>
            
            `
        }
        html += '</div>'
        div.innerHTML = html
    }
})