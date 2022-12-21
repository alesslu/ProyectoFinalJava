let startPage = 'index.html'
let dashboardPage = 'home.html#2'

let redirectIfUserIsLoggedIn = function () {
    if (localStorage.getItem('pokeapp_id')) {
        window.location.href = dashboardPage;
    }
}

redirectIfUserIsLoggedIn();

let verifyUserUsingUsernameAndPassword = function (username, password) {
    fetch(`http://localhost:8000/api/users/find-by-username-and-password/${username}/${password}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (!data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Las credenciales ingresadas son incorrectas o el usuario no existe',
                    confirmButtonText: 'Aceptar'
                })
            } else {
                localStorage.setItem('pokeapp_id', data._id);
                localStorage.setItem('pokeapp_name', data.name);
                window.location.href = dashboardPage;
            }
        })
}


const loginForm = document.getElementById('form-login');
const loginUsername = document.getElementById('username-login');
const loginPassword = document.getElementById('password-login');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    verifyUserUsingUsernameAndPassword(loginUsername.value, loginPassword.value);
});

