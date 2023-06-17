
let category;
let numberProd, apiRequest;
let productImageSource = [];
let productDescription = [];
let productName = [];
let productType = [];
let productId = [];
let pageIndex=1;
let totalNumber;
let leftOff=0;
 function addLowerButtons(){
     document.getElementById("buttons").innerHTML+= '<input type="backtohomepage" value="Previous Page" id="backtohomepage" onclick="addProductsInPageAgain(1)">  ' +'<input type="backtohomepage" value="Next Page" id="backtohomepage" onclick="addProductsInPageAgain(2)">';
 }
 function addCategory(){
     category = category.substring(0, 1).toUpperCase() + category.substring(1, category.length);
     const result = category.split(/(?=[A-Z])/);
     category = result.join(" ");
     document.getElementById("category").innerHTML += '<h2><b>Category: ' + category + '</b></h2>';
 }
async function repeatProductAllLogged(givenCategory) {

    category=givenCategory.toString().substring(22, givenCategory.toString().lastIndexOf("/"));
console.log(category);

    try {
        var index = 0;
        fetch('http://localhost:3003/api/v1/products/' + category.toString(),

            {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.products.forEach(prod => {
                    productImageSource[index] = prod.picture;
                    productType[index] = prod.type;
                    productDescription[index] = prod.description;
                    productName[index] = prod.name;
                    productId[index] = prod._id;
                    index++;
                })
                numberProd=index;
                totalNumber= Math.ceil( numberProd/4);
                console.log(numberProd);
                pageIndex=1;

                addCategory();
                addProductsInPage();
                addLowerButtons();
                addLowerNumber();
               });
    } catch (e) {
        console.log(e);
    }

}

function addProductsInPage(){
    var i;
    var windowLoc = "reviewLogged"
    var button1, button2;

    button1 ="Send Feedback";
   for (i = leftOff; i < leftOff+4; i++) {
        if(i>numberProd){
            break;
        }
        document.getElementById("products1").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + i + '"><p><b>' + productName[i] + '</b><br>' + productDescription[i] + '</p><a class="sendfeedback-button" href="/' + productId[i] + "/" + windowLoc + '">' + button1 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[i] + '" alt="' + productType[i] + '"></div></div> ';
    }

}
function addLowerNumber(){
    let number=parseInt(pageIndex);
    let numberr=number.toString();

    document.getElementById("number").removeChild(document.getElementById("number1"));
    document.getElementById("number").innerHTML+='<div id="number1"></div>';
    document.getElementById("number1").innerHTML+=
        '<h3>Page number: '+numberr+' of ' +totalNumber+'</h3><br>'
}


function addProductsInPageAgain(number){

    let ok=false;
     if(number===2&&pageIndex<=totalNumber&&leftOff+4<=numberProd){
         pageIndex++;
         ok=true;
         leftOff=leftOff+4
     }
     else if(number===1&&pageIndex>1&&leftOff-4>=0){
         pageIndex--;
         ok=true;
         leftOff=leftOff-4;
     }
    var i;
    var windowLoc = "reviewLogged"
    var button1, button2;
    if(ok===true){
        window.scrollTo(0, 0);
    document.getElementById("products").removeChild(document.getElementById("products1"));
        document.getElementById("products").innerHTML+=' <div id="products1"> </div>';

    button1 ="Send Feedback";
    for (i = leftOff; i < leftOff+4; i++) {
        if(i>numberProd){
            break;
        }
        document.getElementById("products1").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + i + '"><p><b>' + productName[i] + '</b><br>' + productDescription[i] + '</p><a class="sendfeedback-button" href="http://localhost:4000/' + productId[i] + "/" + windowLoc + '">' + button1 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[i] + '" alt="' + productType[i] + '"></div></div>';
    }
    addLowerNumber();
}
}