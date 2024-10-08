function enableNameFields(){
    let name_label = document.getElementById("name_label");
    let first_name = document.getElementById("first_name");
    let last_name = document.getElementById("last_name");
    name_label.classList.add('hidden');
    document.getElementById('edit_name').style.display = 'none';
    document.querySelector("#name_feild").classList.remove("hidden");
    first_name.removeAttribute('readonly');
    last_name.removeAttribute('readonly');
    document.querySelector("#save-button").classList.remove('hidden');
}

function enableFieldUsername(){
    let username_label = document.querySelector("#username_label")
    username_label.classList.add('hidden');
    document.getElementById('edit_username').style.display = 'none';
    document.querySelector("#username").classList.remove("hidden");
    document.querySelector("#username").removeAttribute('readonly');
    document.querySelector("#save-button").classList.remove('hidden');
}

function enableFieldEmail(){
    let email_label = document.querySelector("#email_label")
    email_label.classList.add('hidden');
    document.getElementById('edit_email').style.display = 'none';
    document.querySelector("#email").classList.remove("hidden");
    document.querySelector("#email").removeAttribute('readonly');
    document.querySelector("#save-button").classList.remove('hidden');
}