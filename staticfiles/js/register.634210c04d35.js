document.getElementById('username').addEventListener('input', function() {
    var username = this.value.trim();
    if (username !== '') {
      // Check for spaces
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

document.getElementById('password').addEventListener('input', function() {
    var password = this.value.trim();
  
    if (password.length < 8) {
      this.classList.add("red-border");
      document.getElementsByTagName("button").setAttribute('disabled', true);
    } else {
      this.classList.remove("red-border");
      this.classList.add("green-border");
      document.getElementsByTagName("button").removeAttribute('disabled');
    }
  });