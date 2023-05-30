const form = document.getElementById('login-form')

form.addEventListener('submit', loginUser)

async function loginUser(event) {
    event.preventDefault()

    // form data
    const username = document.getElementById('username_id').value
    const password = document.getElementById('password_id').value

    console.log("[login]", username, password)

    await fetch('/login-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => {
        return res.json()
    }).then(json => {

        console.log("[login]", json.information)

        let date = new Date();
        date.setTime(date.getTime() + (60 * 60 * 1000)); 
        const expires = date.toUTCString();
        document.cookie = `jwt=${json.information}; expires=${expires}; path=/`; 

        window.location.href = json.route
        window.alert(json.message)
    })
}
