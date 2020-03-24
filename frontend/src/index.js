let register_form = document.getElementById('register_form')

//https://stackoverflow.com/questions/15467024/hack-for-jquery-to-serialize-values-of-input-and-select-elements-that-are-no
register_form.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log(e)
})
