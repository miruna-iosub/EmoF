/*function accoutInfo() {
    var imagePath = "../assets/images/review.png";
    var type = "user";
    var userName = "Sarah Smith";
    var age = "20";
    var ageText = "Your age is: " + age;
    var text = " <br> Leave a review on any product. <br> They are anonymous, whether you logged in or not."
    document.getElementById("myaccount").innerHTML += '<div class="grid-item"><img src="' + imagePath + '" alt="' + type + '"></div><div class="grid-item item2"><div class="grid-item item2-top"><h2>' + userName + '</h2></div><div class="grid-item item2-bottom"><p>' + ageText + text + '</p></div><div class="sendfeedback-button"><a href="homepage-unloggedin.html">Log Out</a></div></div>';

}*/

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

function accountInfo() {
    const jwtToken = getJWTToken();
    let username = "";
    let email = "";
    let occupation = "";
    let age = "";

    fetch('http://127.0.0.1:3006/userinfo', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch account information');
        }
        return response.json();
      })
      .then((data) => {
        // Extract the username and age from the response data
        data.user.forEach(oneuser => {
 
            username = oneuser.username;
            email = oneuser.email;
            occupation = oneuser.occupation;
            age = oneuser.age;

        })
          console.log("AICI ESTE ACCOUNTINFO " + username +age)
        
        // Update the DOM with the retrieved information
        var imagePath = "../assets/images/review.png";
        var type = "user";
        var userName = username;
        var occupation = occupation;
        var email = email;
        var ageText = "Your age is: " + age + "<br>";
        var occupationText = "Your occupation is: " + occupation + "<br>";
        var emailText = "Your email is: " + email + "<br>";
        var text = " <br> Leave a review on any product. <br> They are anonymous, whether you logged in or not."
  
        document.getElementById("myaccount").innerHTML +=
          '<div class="grid-item"><img src="' +
          imagePath +
          '" alt="' +
          type +
          '"></div><div class="grid-item item2"><div class="grid-item item2-top"><h2>' +
          userName +
          '</h2></div><div class="grid-item item2-bottom"><p>' +
          ageText +
          occupationText +
          emailText +
          text +
          '</p></div></div>';
      })
      .catch((error) => {
        console.error(error);
        window.alert('Failed to fetch account information');
      });
  }


//document.getElementById("myaccount").innerHTML += '<div class="grid-item"><img src="' + imagePath + '" alt="' + type + '"></div><div class="grid-item item2"><div class="grid-item item2-top"><h2>' + userName + '</h2></div><div class="grid-item item2-bottom"><p>' + ageText + text + '</p></div><div class="sendfeedback-button"><a onclick="delete_cookie('jwt', '/')" href="homepage-unloggedin.html">Log Out</a></div></div>';

