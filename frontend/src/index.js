import axios from 'axios';
import './style.css'

const API_URL = '/api/';

function markFieldValidity(selector, validity) {
    let el = document.querySelector(selector)
    if (validity === true) {
        el.innerHTML = '<span title="Можно использовать">✅</span>'
    } else {
        el.innerHTML = '<span title="Нельзя использовать">❌</span>'
    }
}

const isValidUsername = (username) => {
    if (username.length >= 3) {
        axios.get(`${API_URL}check-username`, {
            params: {
                username: username
            }
        })
            .then(() => {
                markFieldValidity('.check-result', true)
            })
            .catch(() => {
                markFieldValidity('.check-result', false)
            })
    } else {
        markFieldValidity('.check-result', false)
    }
};

let usernameInput = document.getElementById('register-username');

usernameInput.addEventListener('change', e => {
    isValidUsername(usernameInput.value)
});


let registerForm = document.getElementById('register-form')

registerForm.addEventListener('submit', e => {
    e.preventDefault()

    let registerFormData = new FormData(registerForm);

    axios.post(`${API_URL}register`, registerFormData)
        .then(response => {
            alert('Успешная регистрация, теперь можно авторизоваться.')
            showLoginForm()
        })
        .catch(error => console.log(error))
});

let loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', e => {
    e.preventDefault()
    let loginFormData = new FormData(loginForm)
    axios.post(`${API_URL}login`, loginFormData)
        .then(response => {
            alert('Успешная авторизация')
        })
        .catch(error => alert('Неверные данные, попробуйте еще раз.'))
})



// наверняка неправильно и некрасиво, но пока так
function showRegistrationForm() {
    document.getElementById('registration-block').classList = ['show']
    document.getElementById('login-block').classList = ['hide']
}

function showLoginForm() {
    document.getElementById('registration-block').classList = ['hide']
    document.getElementById('login-block').classList = ['show']
}

document.getElementById('register-form-link').addEventListener('click', e => {
    showRegistrationForm()
})

document.getElementById('login-form-link').addEventListener('click', e => {
    showLoginForm()
})