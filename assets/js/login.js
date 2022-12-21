
const form = document.getElementById('form');
const username = document.getElementById('username-login');
const password = document.getElementById('password-login');

form.addEventListener('submit', e => {
    e.preventDefault();

    loginuser();

});

function getUsers(){
    fetch(`http://localhost:9000/api/users`)
    .then(response => response.json())
    .then(data => console.log(data));
    return data
}

const loginuser = () =>{
    let data = getUsers();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    console.log (usernameValue)
    console.log (passwordValue)

    let match = data.find(element => element.username === usernameValue && element.password === passwordValue)
    if (match){
        alert("inciaste")
    } else {
        alert("error")
    }
}


