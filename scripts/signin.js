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

/*var attempt = 3; // Variable to count number of attempts.

// Below function Executes on click of login button.
function validate() {
    var username = document.getElementById("username_id").value;
    var password = document.getElementById("password_id").value;
    if (username == "username" && password == "password") {
        window.location = "../pages/index.html"; // Redirecting to other page.
        return false;
    }
    else {
        attempt--; // Decrementing by one.
        alert("You have left " + attempt + " attempt;");
        // Disabling fields after 3 attempts.
        if (attempt == 0) {
            document.getElementById("username_id").disabled = true;
            document.getElementById("password_id").disabled = true;
            return false;
        }
    }
}*/