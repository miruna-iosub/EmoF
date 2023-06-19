const form = document.getElementById('form_id');
form.addEventListener('submit', loginUser);


async function loginUser(event) {
    event.preventDefault();

    // form data
    const username = document.getElementById('username_id').value;
    const password = document.getElementById('password_id').value;

    console.log("[login]", username, password);


    const response = await fetch('http://localhost:3002/api/v1/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });


    const json = await response.json();

    if (!response.ok) {
        window.alert('Login failed');
        window.alert(json.information);

    } else {

        console.log("[login]", json.information);

        let date = new Date();
        date.setTime(date.getTime() + (35 * 60 * 1000)); // 35 min cookie
        const expires = date.toUTCString();
        ///document.cookie = `jwt=${json.information}; expires=${expires}; path=/`;
        document.cookie = `jwt=${json.information}; expires=${expires}; path=/`;

    }
    window.location.href = json.route;

    window.alert(json.message);

}
