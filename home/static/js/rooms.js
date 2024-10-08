window.onload = function() {
    const dataContainer = document.getElementById('data-container');
    let created = dataContainer.getAttribute('data-user-status');
    const userName = dataContainer.getAttribute('data-user-name');
    const userProfileImage = dataContainer.getAttribute('data-user-profile-image');
    var roomName = document.getElementById('roomName').textContent.trim().slice(1);
    let isCreated;
    var wsProtocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
    var ws = new WebSocket(wsProtocol + window.location.host + '/ws/ac/room/' + roomName + '/' + created + '/');

    function checkUserExists(userusername) {
        let joinedUsers = document.querySelectorAll('.joinedUser');

        for (let element of joinedUsers) {
            if (userusername == element.getAttribute('userusername')) {
                return false;
            }
        }

        return true; 
    }

    ws.onopen = () => {
        isCreated = created === "created";
        ws.send(JSON.stringify({
            command: 'join',
            'username': userName,
            'userProfileImage': userProfileImage
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'chat_message') {
            const chatData = `
                <div class="flex items-start mb-4">
                    <img class="w-10 h-10 rounded-full object-cover mr-4" src="${data.userProfileImage}" alt="Profile Image" />
                    <div>
                        <p class="text-sm font-semibold">${data.username}&nbsp;&nbsp;<span class="font-thin text-xs">${data.timeString}</span></p>
                        <p class="text-sm">${data.message}</p>
                    </div>
                </div>
            `;
            document.querySelector("#chatAppendArea").insertAdjacentHTML('beforeend', chatData);
        } else if (data.type === 'join_message') {
            const userIconHTML = `
                <div class="flex justify-center">
                    <div class="text-md font-thin">${data.username} joined the chat</div>
                </div>
            `;
            if (checkUserExists(data.username)) {
                document.querySelector("#chatAppendArea").insertAdjacentHTML('beforeend', userIconHTML);
            }
        }
    };

    ws.onclose = () => {
        console.log("WebSocket closed");
    };

    document.getElementById("sendTextMsg").onclick = function(event) {
        event.preventDefault();
        let inputElement = document.getElementById('msgTextInput');
        const now = new Date();

        let hours = now.getHours();
        const minutes = now.getMinutes();
        const isPM = hours >= 12;

        hours = hours % 12;
        hours = hours ? hours : 12; 
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const ampm = isPM ? 'PM' : 'AM';

        const timeString = `${hours.toString().padStart(2, '0')}:${formattedMinutes} ${ampm}`;

        let input = inputElement.value;
        if (input !== '') {
            ws.send(JSON.stringify({
                command: 'message',
                'msg': input,
                'timeString': timeString,
                'username': userName,
                'userProfileImage': userProfileImage
            }));
            inputElement.value = '';
        }
    };
};
