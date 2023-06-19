function getJWTToken() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('jwt=')) {
            return cookie.substring(4); // Retrieve the value after 'jwt='
        }
    }
    return null; // Return null if JWT token is not found

}


function get_cookie(name) {
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function delete_cookie(name, path) {
    if (get_cookie(name)) {
        document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";

        window.alert('You have been logged out!')
    } else {
        window.alert('You are not logged in!')
    }

}

async function deleteUser() {
    const jwtToken = getJWTToken();

    try {
        const response = await fetch('http://127.0.0.1:3002/api/v1/deleteAccount', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
                jwt: jwtToken
            }),
        });
        console.log(response)
        if (!response.ok) {
            throw new Error('Deletion failed!');
        }

        const json = await response.json();

        console.log("[updateinfo]", json.route);

        console.log("[response]", json.message);

        document.cookie = 'jwt' + "=" +
            (('/') ? ";path=" + '/' : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";

        window.location.href = json.route;
        window.alert(json.message);
    } catch (error) {
        console.error(error);
    }
}