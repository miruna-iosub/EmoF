const form = document.getElementById('accountForm');
form.addEventListener('submit', updateInfo);

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

async function updateInfo(event) {
  event.preventDefault();

  // form data
  const currentUsername = document.getElementById('username_id_old').value;
  const usernameNew = document.getElementById('username_id').value;
  const age = document.getElementById('age_id').value;
  const password1 = document.getElementById('password_id').value;
  const password2 = document.getElementById('repeat_password_id').value;
  const jwtToken = getJWTToken();



  try {
    const response = await fetch('http://127.0.0.1:3006/updateinfo', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        currentUsername,
        usernameNew,
        age,
        password1,
        password2,
      }),
    });
    console.log("[updateInfo]", currentUsername, usernameNew, age, password1, password2, jwtToken);
    console.log(response)
    if (!response.ok) {
      throw new Error('Patch failed');
    }

    const json = await response.json();

    console.log("[response]", json.message);

   window.location.href = json.route;
   window.alert(json.message);
  } catch (error) {
    console.error(error);
    window.alert('Patch failed');
  }
}


