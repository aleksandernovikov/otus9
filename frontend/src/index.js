import axios from 'axios';
import './style.css'

const API_URL = '/api/';

function mark_field_validity(selector, validity) {
    let el = document.querySelector(selector)
    if (validity === true) {
        el.innerHTML = '<span title="Можно использовать">✅</span>'
    } else {
        el.innerHTML = '<span title="Нельзя использовать">❌</span>'
    }
}

const is_valid_username = username => {
    if (username.length >= 3) {
        axios.get(`${API_URL}check-username`, {
            params: {
                username: username
            }
        })
            .then(() => {
                mark_field_validity('.check-result', true)
            })
            .catch(() => {
                mark_field_validity('.check-result', false)
            })
    } else {
        mark_field_validity('.check-result', false)
    }
};

let username_input = document.querySelector('#register-username');
username_input.addEventListener('input', e => {
    let username = username_input.value
    let timer

    if (is_valid_username(username)) {
        clearTimeout(timer)
        timer = setTimeout(() => is_valid_username(username), 500)
    }
});

let register_form = document.querySelector('#register-form')
register_form.addEventListener('submit', e => {
    e.preventDefault()

    let inputs = document.querySelectorAll('#register-form input')
    let formObj = {}
    inputs.forEach((item, i, arr) => {
        formObj[item.name] = item.value
    });

    axios.post('/api/register', formObj)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error))
});