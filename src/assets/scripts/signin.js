const form = document.getElementById('form_id');
form.addEventListener('submit', loginUser);

async function loginUser(event) {
  event.preventDefault();

  // form data
  const username = document.getElementById('username_id').value;
  const password = document.getElementById('password_id').value;

  console.log("[login]", username, password);

  try {
    const response = await fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const json = await response.json();

    console.log("[login]", json.information);

    let date = new Date();
    date.setTime(date.getTime() + (35 * 60 * 1000)); // 35 min cookie
    const expires = date.toUTCString();
    document.cookie = `jwt=${json.information}; expires=${expires}; path=/`;

   window.location.href = json.route;
 /*
   const encodedUsername = encodeURIComponent(username);
   const route = `${json.route}`;
   const newUrl = `?username=${encodedUsername}${route}`;
   window.history.pushState({ username }, "", newUrl);
*/
   window.alert(json.message);
  } catch (error) {
    console.error(error);
    window.alert('Login failed');
  }
}