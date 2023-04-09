function addProduct() {
    var productName = document.getElementById("name").value;
    var expirationDate = document.getElementById("expiration-date").innerHTML;
    var productionDate = document.getElementById("production-date").value;
    var productCategory = document.getElementById("category").value;
    var productSubcategory = document.getElementById("subcategory").value;
    var questions = document.getElementById("question").value;
    var newQuestion = document.getElementById("new-question").value;
    var desc = document.getElementById("description").value;

    if (productName == "" || productCategory == "" || 
    productSubcategory == "" || questions == "" || 
    newQuestion == "" || desc == "") {
        alert("Please fill all the fields!");
        return false;
    }  

    if (productName.length < 5) {
        alert("The name of the product must contain at least 5 characters."); 
        return false;       
    }

    if(productCategory != "service" || productCategory != "product" ||
    productCategory != "person" || productCategory != "aristic artefact" ||
    productCategory != "geographical place"){
        alert("The category you entered is wrong. Please check the categories from the menu."); 
        return false;       
    }
}