const form = document.getElementById('register-form');
form.addEventListener('submit', userRegister);

async function userRegister(event) {
  event.preventDefault();

  // form data
  
  const username = document.getElementById('username_id').value
  const email = document.getElementById('email_id').value
  const age = document.getElementById('age_id').value;
  const occupation = document.getElementById('occupation_id').value
  const password1 = document.getElementById('password_id').value
  const password2 = document.getElementById('repeat_password_id').value


  try {
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, 
        email, 
        age, 
        occupation, 
        password1, 
        password2
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error('Register failed');
    }

    console.log(`http://localhost:3001{json.route}`)
    window.location.href = json.route
    window.alert(json.message)
  } catch (error) {
    console.error(error);
    window.alert('Register failed');
  }
}
/*function validate() {
    var username = document.getElementById("username_id").value;
    var email = document.getElementById("email_id").value;
    var age = document.getElementById("age_id").value;
    var occupation = document.getElementById("occupation_id").value;
    var password = document.getElementById("password_id").value;
    var repeat_password = document.getElementById("repeat_password_id").value;


    if (username == "" || email == "" || age == "" || occupation == "" || password == "" || repeat_password == "") {
        alert("Please fill all the fields!");
        return false;
    }
    if (age < 18) {
        alert("Too young to create an account!");
        return false;
    }
    else if (password != repeat_password) {
        alert("Passwords do not match!");
        return false;
    }
    else {
        window.location = "../pages/signupconfirmation.html";
        return true;
    }
}*/
