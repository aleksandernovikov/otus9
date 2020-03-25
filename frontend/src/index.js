register_form.addEventListener('submit', (e) => {
    e.preventDefault()
    let inputs = document.querySelectorAll('#register_form input')
    let formObj = {}
    inputs.forEach((item, i, arr) => {
        formObj[item.name] = item.value
    })
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(formObj)
    })
        .then(response => {
            console.log(response.status)
            response.json()
        })
        .then(result => alert(JSON.stringify(result, null, 2)))
})