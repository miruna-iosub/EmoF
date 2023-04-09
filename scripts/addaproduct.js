function addProduct() {
    var productName = document.getElementById("name").value;
    var expirationDate = document.getElementById("expiration-date").innerHTML;
    var productionDate = document.getElementById("production-date").value;
    var productCategory = document.getElementById("category").value;
    var productSubcategory = document.getElementById("subcategory").value;
    //var questions = document.getElementById("question").value;
    var newQuestion = document.getElementById("new-question").value;
    var desc = document.getElementById("description").value;

    const question1Checked = document.querySelector('input[name="question1"]').checked;
    const question2Checked = document.querySelector('input[name="question2"]').checked;
    const question3Checked = document.querySelector('input[name="question3"]').checked;
    const question4Checked = document.querySelector('input[name="question4"]').checked;


    if (productName == "" || productCategory == "" || 
    productSubcategory == "" ||
    newQuestion == "" || desc == "") {
        alert("Please fill all the fields!");
        return false;
    }  

    else if (productName.length < 5) {
        alert("The name of the product must contain at least 5 characters."); 
        return false;       
    }
    
    else if (!question1Checked && !question2Checked && !question3Checked && !question4Checked) {
        alert('Please choose a question.');
    } 
    else {
        window.location = "../pages/signupconfirmation.html";
        return true;
}
}