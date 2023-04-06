function validate(){
    var username = document.getElementById("username_id").value;
    var email = document.getElementById("email_id").value;
    var age = document.getElementById("age_id").value;
    var occupation = document.getElementById("occupation_id").value;
    var password = document.getElementById("password_id").value;
    var repeat_password = document.getElementById("repeat_password_id").value;

  
    if ( username == "" || email == "" || age == "" || occupation == "" || password == "" || repeat_password == "" ){
        alert ("Please fill all the fields!");
        return false;
    }
    if(age < 18){
        alert("Too young to create an account!");
        return false;
    }
    else if (password != repeat_password){
        alert ("Passwords do not match!");
        return false;
    }
    else{
        window.location = "../pages/index.html"; 
        return true;
    }
}
