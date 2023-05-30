function accoutInfo() {
    var imagePath = "../images/sarah.png";
    var type = "user";
    var userName = "Sarah Smith";
    var profileDescription = "My job is to make skincare products and makeup for all skin types."
    document.getElementById("myaccount").innerHTML += '<div class="grid-item"><img src="' + imagePath + '" alt="' + type + '"></div><div class="grid-item item2"><div class="grid-item item2-top"><h2>' + userName + '</h2></div><div class="grid-item item2-bottom"><p>' + profileDescription + '</p></div><div class="sendfeedback-button"><a href="homepage-unloggedin.html">Log Out</a></div></div>';

}