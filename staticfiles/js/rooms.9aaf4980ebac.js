window.onload = function() {
    const dataContainer = document.getElementById('data-container');
    let created = dataContainer.getAttribute('data-user-status');
    const userName = dataContainer.getAttribute('data-user-name');
    const userProfileImage = dataContainer.getAttribute('data-user-profile-image');
    var roomName = document.getElementById('roomName').textContent.trim().slice(1);
    var wsProtocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
    console.log(roomName, created)
    var ws = new WebSocket(wsProtocol + window.location.host + '/ws/ac/room/' + roomName + '/' + created + '/');

    let iceServers = {
        iceServers: [
            { urls: "stun:stun.services.mozilla.com" },
            { urls: "stun:stun.l.google.com:19302" },
        ],
    };

    let isCreated;
    let rtcpeerconnection;
    let stream;

    function startMediaStream() {
        setTimeout(() => {
            let local_audio = document.getElementById('our_audio');
            if (!local_audio) {
                console.error("Error: 'local_audio' element not found.");
                return;
            }
            
            navigator.mediaDevices.getUserMedia({
                video: false,
                audio: {
                    echoCancellation: true,
                    // noiseSuppression: true
                }
            }).then((s) => {
                    stream = s;
                    local_audio.srcObject = s;
                    local_audio.onloadeddata = () => {
                        local_audio.play();
                    };
                    console.log("Created or Joined ", isCreated);
                    if (isCreated) {
                        createOffer();
                    } else {
                        ws.send(JSON.stringify({
                            command: 'join',
                            'username': userName,
                            'userProfileImage': userProfileImage
                        }));
                    }
                })
                .catch(error => {
                    console.error("Error accessing media devices.", error);
                });
        }, 100);
    }

    function checkUserExists(userusername) {
        console.log("Checking if user exists...");
        let joinedUsers = document.querySelectorAll('.joinedUser');

        for (let element of joinedUsers) {
            if (userusername == element.getAttribute('userusername')) {
                return false;
            }
        }

        return true; 
    }

    ws.onopen = () => {
        console.log("WebSocket connection opened");

        isCreated = created === "created";
        console.log(isCreated ? "Room created, starting media stream" : "Joining an existing room, starting media stream");
        // startMediaStream();
        ws.send(JSON.stringify({
            command: 'join',
            'username': userName,
            'userProfileImage': userProfileImage
        }));
    };

    ws.onmessage = (event) => {
        console.log("Message received: ", event.data);
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
            console.log('User joined:', data);
            
                // <div name="userIcon" class="flex flex-wrap h-fit relative justify-center joinedUser" userusername="${data.username}">
                //     <img class="userIconOutlineNormal w-16 h-16 p-0.5 object-cover sm:w-16 sm:h-16 md:w-20 md:h-20" src="${data.userProfileImage}" alt="Profile Image" />
                //     <div class="absolute rounded-2xl px-2 h-fit w-fit bg-black flex justify-center items-center opacity-25 self-end mb-2 hidden" id="userMenuBtn">
                //         <i class="fas fa-ellipsis-h text-2xl text-white"></i>
                //     </div>
                //     <div name="muteIcon" class="muteIcon absolute my-[28%] rounded-full hidden">
                //         <i class="fa-solid fa-volume-xmark text-4xl text-red-600"></i>
                //     </div>
                //     <div name="userMenu" class="absolute lefta-12 bottom-0 w-fit opacity-80 z-50 bg-[#181717] rounded-xl shadow-lg hidden">
                //         <ul class="hidden">
                //             <li class="px-2 py-2 hover:bg-gray-900 text-white cursor-pointer bg-[#181717] rounded-lg">Mute</li>
                //             <li class="px-2 py-2 hover:bg-gray-900 text-white cursor-pointer bg-[#181717] rounded-lg">Kickout</li>
                //         </ul>
                //     </div>
                // </div>

            const userIconHTML = `
                <div class="flex justify-center">
                    <div class="text-md font-thin">${data.username} joined the chat</div>
                </div>
            `;
            if (checkUserExists(data.username)) {
                document.querySelector("#chatAppendArea").insertAdjacentHTML('beforeend', userIconHTML);
            }
        } else if (data.command === 'offer') {
            if (!isCreated) {
                createAnswer(data.offer);
            }
        } else if (data.command === 'answer') {
            if (isCreated) {
                rtcpeerconnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
        } else if (data.command === 'candidate') {
            if (data.isCreated !== isCreated) {
                rtcpeerconnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        }
    };

    ws.onclose = () => {
        console.log("WebSocket closed");
    };

    // function createOffer() {
    //     rtcpeerconnection = new RTCPeerConnection(iceServers);
    //     rtcpeerconnection.onicecandidate = onIceCandidate;
    //     rtcpeerconnection.ontrack = onTrack;

    //     stream.getTracks().forEach((track) => {
    //         rtcpeerconnection.addTrack(track, stream);
    //     });

    //     rtcpeerconnection.createOffer()
    //         .then(offer => {
    //             rtcpeerconnection.setLocalDescription(offer);
    //             ws.send(JSON.stringify({
    //                 command: 'offer',
    //                 offer: offer,
    //                 room: roomName
    //             }));
    //         });
    // }

    // function createAnswer(offer) {
    //     rtcpeerconnection = new RTCPeerConnection(iceServers);
    //     rtcpeerconnection.onicecandidate = onIceCandidate;
    //     rtcpeerconnection.ontrack = onTrack;
    //     // onTrack
    //     print("CREATING OFFFER")
    //     rtcpeerconnection.setRemoteDescription(new RTCSessionDescription(offer));
    //     stream.getTracks().forEach((track) => {
    //         print("THIS IS STREAMS ", track, stream)
    //         rtcpeerconnection.addTrack(track, stream);
    //     });

    //     rtcpeerconnection.createAnswer()
    //         .then(answer => {
    //             rtcpeerconnection.setLocalDescription(answer);
    //             ws.send(JSON.stringify({
    //                 command: 'answer',
    //                 answer: answer,
    //                 room: roomName
    //             }));
    //         });
    // }

    // function onIceCandidate(event) {
    //     if (event.candidate) {
    //         ws.send(JSON.stringify({
    //             command: 'candidate',
    //             candidate: event.candidate,
    //             isCreated: isCreated,
    //             room: roomName
    //         }));
    //     }
    // }

    // function onTrack(event) {
    //     if (event.streams[0].id !== stream.id) {
    //         let remote_audio = document.getElementById('remote_audio');
    //         remote_audio.srcObject = event.streams[0];
    //         remote_audio.play();
    //     }
    // }
    

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
