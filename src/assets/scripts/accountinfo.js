function accoutInfo() {
    var imagePath = "../assets/images/review.png";
    var type = "user";
    var userName = "Sarah Smith";
    var age = "20";
    var ageText = "Your age is: " + age;
    var text = " <br> Leave a review on any product. <br> They are anonymous, whether you logged in or not."
    document.getElementById("myaccount").innerHTML += '<div class="grid-item"><img src="' + imagePath + '" alt="' + type + '"></div><div class="grid-item item2"><div class="grid-item item2-top"><h2>' + userName + '</h2></div><div class="grid-item item2-bottom"><p>' + ageText + text + '</p></div><div class="sendfeedback-button"><a href="homepage-unloggedin.html">Log Out</a></div></div>';

}


 
//document.getElementById("myaccount").innerHTML += '<div class="grid-item"><img src="' + imagePath + '" alt="' + type + '"></div><div class="grid-item item2"><div class="grid-item item2-top"><h2>' + userName + '</h2></div><div class="grid-item item2-bottom"><p>' + ageText + text + '</p></div><div class="sendfeedback-button"><a onclick="delete_cookie('jwt', '/')" href="homepage-unloggedin.html">Log Out</a></div></div>';

