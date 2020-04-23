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

const isValidUsername = username => {
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
usernameInput.addEventListener('input', e => {
    let username = usernameInput.value
    let timer

    if (isValidUsername(username)) {
        clearTimeout(timer)
        timer = setTimeout(() => isValidUsername(username), 500)
    }
});

let registerForm = document.getElementById('register-form')
registerForm.addEventListener('submit', e => {
    e.preventDefault()

    let registerFormData = new FormData(registerForm);

    axios.post(`${API_URL}register`, registerFormData)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error))
});