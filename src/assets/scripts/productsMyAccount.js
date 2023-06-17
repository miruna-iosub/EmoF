
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



async function repeatProductMyAccount() {
    const jwtToken = getJWTToken();
    let numberProd;
    let productId=[]
    let productImageSource = [];
    let productDescription = [];
    let productName = [];
    let productType = [];
    let productStatus = [];
    let productCategory = [];
    try {

        var index = 0;
        fetch('http://localhost:3003/api/v1/products/userProducts', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization': `Bearer ${jwtToken}`,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // numberProd = data.numberProducts.toInt();
                data.products.forEach(prod => {
                    productId[index]=prod._id;
                    productImageSource[index] = prod.picture;
                    productType[index] = prod.type;
                    productDescription[index] = prod.description;
                    productName[index] = prod.name;
                    productStatus[index] = prod.status;
                    productCategory[index]=prod.category;
                    console.log(productImageSource);
                    index++;
                })
                numberProd = index;
                var windowLocSeeStats="charts.html";
                var button1, button2;
                button1 = "Close Forms";
                button2 = "See Statistics";
                for (index = 0; index < numberProd; index++) {
                    if (productStatus[index] === "ongoing") {
                        document.getElementById("products1").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + index + '"><p><b>' + productName[index] + '</b><br>' + productDescription[index] + '</p><a class="sendfeedback-button"  onclick="closeForm()">' + button1 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[index] + '" alt="' + productType[index] + '"></div></div>';
                    } else {
                        document.getElementById("products").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + index + '"><p><b>' + productName[index] + '</b><br>' + productDescription[index] + '</p><a class="sendfeedback-button" href="' + productCategory[index]+'/'+productId[index] + '/' + windowLocSeeStats+ '">' + button2 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[index] + '" alt="' + productType[index] + '"></div></div>';
                    }
                }
            });
    } catch (e) {
        console.log(e);
    }
}