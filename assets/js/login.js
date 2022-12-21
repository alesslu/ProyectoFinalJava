function consultarPokemons() {
    fetch('http://localhost:9000/api/users')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let favoritos = data;
            validarLogin(favoritos)
            console.log(favoritos)
        })
}


const form = document.getElementById('form-login');
const username = document.getElementById('username-login');
const password = document.getElementById('password-login');

form.addEventListener('submit', e => {
    e.preventDefault();

    consultarPokemons();

});



function validarLogin(favoritos) {
    const usernameValue = username.value;
    const passwordValue = password.value;
    const h2 = document.getElementById ('usuariologin')
    console.log(usernameValue)
    console.log(passwordValue)
    console.log(favoritos)
    let match = favoritos.find(element=> element.username===usernameValue && element.password===passwordValue)
    console.log(match)
    if (match){
        window.location.href = 'indexusuario.html';
        
    } else {
        alert("Usuario no registrado")
    }
    
}


