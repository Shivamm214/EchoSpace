document.getElementById('menu-button').addEventListener('click', function() {
    var menuItems = document.getElementById('menu-items');
    menuItems.classList.toggle('hidden');
});

window.onclick = function(event) {
    if (!event.target.matches('#menu-button, #menu-button *')) {
        var menuItems = document.getElementById('menu-items');
        if (!menuItems.classList.contains('hidden')) {
            menuItems.classList.add('hidden');
        }
    }
}

document.querySelector("#showProfile").addEventListener('click', ()=>{
    profileInfo.classList.toggle("hidden");
})

document.querySelector("#closeProfile").addEventListener('click', ()=>{
    profileInfo.classList.toggle("hidden");
})


setTimeout(function() {
    document.getElementById("changeGuestPaswd").style.display = "none";
  }, 3000);

  function enableNameFields(){
    let name_label = document.getElementById("name_label");
    let first_name = document.getElementById("first_name");
    let last_name = document.getElementById("last_name");
    name_label.classList.add('hidden');
    document.getElementById('edit_name').style.display = 'none';
    document.getElementById('change-password-button').style.display = 'none';
    document.querySelector("#name_feild").classList.remove("hidden");
    first_name.removeAttribute('readonly');
    last_name.removeAttribute('readonly');
    document.querySelector("#save-button").classList.remove('hidden');
}

function enableFieldUsername(){
    let username_label = document.querySelector("#username_label")
    username_label.classList.add('hidden');
    document.getElementById('edit_username').style.display = 'none';
    document.getElementById('change-password-button').style.display = 'none';
    document.querySelector("#username").classList.remove("hidden");
    document.querySelector("#username").removeAttribute('readonly');
    document.querySelector("#save-button").classList.remove('hidden');
}
function changeProfileImage() {
    document.getElementById('changeProfileImageFile').click();
    }
    
    function showUploadedMessage(input) {
        if (input.files && input.files[0]) {
        document.querySelector("#save-button").classList.remove('hidden');
        dpEditIcon = document.getElementById('dpEditIcon');
        dpEditIcon.classList.remove('fa-edit');
        dpEditIcon.classList.add("fa-check");
        dpEditIcon.classList.add("bg-green-800");
    }
}

document.getElementById('username').addEventListener('input', function() {
    var username = this.value.trim();
    if (username !== '') {
      if (username.indexOf(' ') !== -1) {
        document.getElementById('username').classList.add("red-border");
        document.getElementById('username').classList.remove("green-border");
      } else {
        checkUsernameAvailability(username);
      }
    } else {
      document.getElementById('username').classList.remove("green-border", "red-border");
    }
  });

function checkUsernameAvailability(username) {
    fetch('/check_username/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({'username': username})
    })
    .then(response => response.json())
    .then(data => {
        if (data.available) {
            document.getElementById('username').classList.remove("red-border");
            document.getElementById('username').classList.add("green-border");
        } else {
            document.getElementById('username').classList.remove("green-border");
            document.getElementById('username').classList.add("red-border");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (document.getElementById('username').classList.contains('red-border')) {
        alert('Please choose a different username as the current one is already taken.');
    } else {
        this.submit();
    }
});

document.getElementById('new_password').addEventListener('input', function() {
    var new_password = this.value.trim();
    if (new_password.length < 8) {
      this.classList.add("red-border");
    } else {
      this.classList.remove("red-border");
      this.classList.add("green-border");
    }
});

console.log("kk")

document.querySelector("#closeChangePassword").addEventListener('click', ()=>{
    document.getElementById("changePasswordDiv").classList.toggle("hidden");
});

document.querySelector("#change-password-button").addEventListener('click', ()=>{
    document.querySelector("#profileInfo").classList.add('hidden');
    document.getElementById("changePasswordDiv").classList.toggle("hidden");
});

let showPassChangeDialog = ()=>{
    document.getElementById("changePasswordDiv").classList.toggle("hidden");
}

let leftAreaBtn = document.getElementById("leftAreaBtn");
let leftArea = document.getElementById('leftArea');
let closeDrawar = document.getElementById('closeDrawar');
let subNavbar = document.getElementById('subNavbar');

closeDrawar.addEventListener('click', function() {
    if (leftArea.style.display = 'inline'){
        leftArea.style.display = 'none';
        leftAreaBtn.style.display = 'inline-block';
        subNavbar.style.justifyContent = 'space-between';
    }else{
        leftArea.style.display = 'inline';
    }
    
});

leftAreaBtn.addEventListener('click', function() {
    leftArea.style.display = 'inline';
    subNavbar.style.justifyContent = 'end';
    leftAreaBtn.style.display = 'none';
});

let rooms = document.getElementById('rooms');
let followings = document.getElementById('followings');
let roomsTab = document.getElementById('roomsTab');
let followingsTab = document.getElementById('followingsTab');
let explore = document.getElementById('explore');
let exploreTab = document.getElementById('exploreTab');

exploreTab.addEventListener('click', ()=>{
    exploreTab.classList.add('border-b');
    roomsTab.classList.remove('border-b');
    rooms.classList.add('hidden');
    explore.classList.remove('hidden');
});

roomsTab.addEventListener('click', ()=>{
    roomsTab.classList.add('border-b');
    exploreTab.classList.remove('border-b');
    explore.classList.add('hidden');
    rooms.classList.remove('hidden');
});

let searchFeild = document.getElementById('searchFeild');
let tabs = document.getElementById('tabs');
let tabContent = document.getElementById('tabContent');

document.addEventListener("DOMContentLoaded", function() {
    const userIcons = document.querySelectorAll("[name='userIcon']");

    userIcons.forEach(userIcon => {
        const userMenuBtn = userIcon.querySelector("#userMenuBtn");
        const userMenu = userIcon.querySelector("[name='userMenu']");

        userIcon.addEventListener("mouseenter", () => {
            userMenuBtn.classList.remove("hidden");
        });

        userIcon.addEventListener("mouseleave", () => {
            userMenuBtn.classList.add("hidden");
        });

        userMenuBtn.addEventListener("click", () => {
            userMenu.classList.toggle("hidden");
        });

        userMenu.addEventListener("mouseleave", () => {
            userMenu.classList.add("hidden");
        });
    });
});
