const formEdit = document.getElementById('formEdit');
const nameEdit = document.getElementById('nameEdit');
const emailEdit = document.getElementById('emailEdit');
const usernameEdit = document.getElementById('usernameEdit');
const passwordEdit = document.getElementById('passwordEdit')
const confirpassEdit = document.getElementById('confirpassEdit');
const buttonEdit = document.getElementById('btnEdit');
const buttonGuardarEdit = document.getElementById('btnGuardarEdit');
const buttonEliminarEdit = document.getElementById('btnEliminarEdit');
buttonGuardarEdit.style.display = 'none';
document.getElementById('mensaje-correcto-editar').style.display = 'none';

getUser();

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    const validoDisplay = inputControl.querySelector('.valido');

    errorDisplay.innerText = ' ';
    validoDisplay.innerText = ' ';
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('valido')
}

const setSuccess = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    const validoDisplay = inputControl.querySelector('.valido');

    errorDisplay.innerText = ' ';
    validoDisplay.innerText = ' ';
    validoDisplay.innerText = message;
    inputControl.classList.remove('error');
    inputControl.classList.add('valido');
};

formEdit.addEventListener('submit', e => {
    e.preventDefault();
});

const validarname = name => {
    const te = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    return te.test(String(name))
}

const validaremail = email => {
    const em = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return em.test(String(email))
}

const validarUsername = username => {
    const us = /^[a-zA-Z0-9\_\-]{4,16}$/
    return us.test(String(username).toLowerCase())
}

const validarPass = pass => {
    const pas = /^.{4,12}$/
    return pas.test(String(pass))
}

const validateInputsEdit = () => {
    const nameValue = nameEdit.value.trim();
    const emailValue = emailEdit.value.trim();
    const usernameValue = usernameEdit.value.trim();
    const passwordValue = passwordEdit.value.trim();
    const confirpassValue = confirpassEdit.value.trim();

    //validando nombre
    if (nameValue === '') {
        setError(nameEdit, 'Ingrese su nombre completo');
        nameEdit.focus();
        return false;
    } else if (!validarname(nameValue)) {
        setError(nameEdit, 'Ingrese un nombre válido');
        nameEdit.focus();
        return false;
    }
    else {
        setSuccess(nameEdit, '¡Datos Correctos!');
    }

    //validando email
    if (emailValue === '') {
        setError(emailEdit, 'Ingrese su email');
        emailEdit.focus();
        return false;
    } else if (!validaremail(emailValue)) {
        setError(emailEdit, 'Ingrese un email válido');
        emailEdit.focus();
        return false;
    }
    else {
        setSuccess(emailEdit, '¡Datos Correctos!');

    }

    //validando nombre de usuario
    if (usernameValue === '') {
        setError(usernameEdit, 'Ingrese su usuario');
        usernameEdit.focus();
        return false;
    } else if (!validarUsername(usernameValue)) {
        setError(usernameEdit, 'Ingrese un usuario válido');
        usernameEdit.focus();
        return false;
    } else {
        setSuccess(usernameEdit, '¡Datos Correctos!');
    }

    //validando pass
    if (passwordValue === '') {
        setError(passwordEdit, 'Ingrese su contraseña');
        passwordEdit.focus();
        return false;
    } else if (!validarPass(passwordValue)) {
        setError(passwordEdit, 'Ingrese una contraseña válida');
        passwordEdit.focus();
        return false;
    } else {
        setSuccess(passwordEdit, '¡Datos Correctos!');
    }

    //validando confirmacion password
    if (confirpassValue === '') {
        setError(confirpassEdit, 'Vuelva a ingresar su contraseña');
        confirpassEdit.focus();
        return false;
    } else if (confirpassValue != passwordValue) {
        setError(confirpassEdit, 'Las contraseñas no coinciden');
        confirpassEdit.focus();
        return false;
    } else {
        setSuccess(confirpassEdit, '¡Datos Correctos!');
    }

    document.getElementById('mensaje-correcto-editar').style.display = 'block';
    return true;
};

let disableFields = function () {
    nameEdit.setAttribute('disabled', true);
    emailEdit.setAttribute('disabled', true);
    usernameEdit.setAttribute('disabled', true);
    passwordEdit.setAttribute('disabled', true);
    confirpassEdit.setAttribute('disabled', true);
}

let enableFields = function () {
    nameEdit.removeAttribute('disabled');
    emailEdit.removeAttribute('disabled');
    usernameEdit.removeAttribute('disabled');
    passwordEdit.removeAttribute('disabled');
    confirpassEdit.removeAttribute('disabled');
    nameEdit.focus();
    buttonEdit.style.display = 'none';
    buttonGuardarEdit.style.display = 'block';
    document.getElementById('mensaje-correcto-editar').style.display = 'none';
}

//MOSTRAR DATOS
function getUser() {
    let id = localStorage.getItem('pokeapp_id');
    fetch(`http://localhost:8000/api/users/${id}`)
        .then(response => response.json())
        .then(data => {
            this.nameEdit.value = data.name;
            this.emailEdit.value = data.email;
            this.usernameEdit.value = data.name_user;
            this.passwordEdit.value = data.password;
            this.confirpassEdit.value = data.password;
        });
}

//CREATE USER
function createUser() {
    fetch(`http://localhost:8000/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameEdit.value,
            email: emailEdit.value,
            name_user: usernameEdit.value,
            password: passwordEdit.value
        })
    })
        .then(response => response.json())
        .then(data => {
            data.name = this.nameEdit.value;
            data.email = this.emailEdit.value;
            data.name_user = this.usernameEdit.value;
            data.password = this.passwordEdit.value;
        })
}


//UPDATE USER
function validarusername(username) {
    fet
}

function updateUser() {
    Swal.fire({
        title: '¿Está seguro(a) de guardar los cambios?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if (validateInputsEdit() === true) {
                buttonEdit.style.display = 'block';
                buttonGuardarEdit.style.display = 'none';
                fetch(`http://localhost:8000/api/users/${localStorage.getItem('pokeapp_id')}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameEdit.value,
                        email: emailEdit.value,
                        name_user: usernameEdit.value,
                        password: passwordEdit.value
                    })
                }).then(response => response.json())
                .then(data => {
                    localStorage.setItem('pokeapp_name', nameEdit.value);
                    getUserLoggedName();
                    disableFields();
                    document.getElementById('mensaje-correcto-editar').style.display = 'block';
                });
            } else {
                Swal.fire('Compruebe el formulario', '', 'info')
            }
        }
    })
}


// DELETE CUENTA
buttonEliminarEdit.addEventListener('click', e => {
    e.preventDefault();

    eliminarcuenta();
});

function eliminarcuenta() {
    Swal.fire({
        title: '¿Está seguro(a) que desea eliminar su cuenta?',
        text: 'Esta acción no podrá revertirse',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'No, cancelar',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            fetch(`http://localhost:8000/api/users/${localStorage.getItem('pokeapp_id')}`, {
                method: 'DELETE'
            }).then(res => res.json())
                .then(() => {
                    window.location.href = 'index.html';
                    localStorage.clear()
                });
        } else {
            disableFields();
        }
    });
}

let getUserLoggedName = function () {
    if (localStorage.getItem('pokeapp_name')) {
        document.querySelectorAll('.user_logged').forEach(item => {
            item.innerHTML = localStorage.getItem('pokeapp_name');
        })
    }
}
getUserLoggedName()
