
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
function get_cookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
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
        fetch('http://localhost:3003/api/v1/products/user', {
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
                var windowLocSeeStats="charts";
                var button1, button2,button3=3;
                button1 = "Close Form";
                button2 = "See Statistics";
                button3 = "Delete Form";
                for (index = 0; index < numberProd; index++) {
                    if (productStatus[index] === "ongoing") {
                        document.getElementById("products1").innerHTML += ' <div class="container2" id="container2">' +
                            '<div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + index + '">' +
                            '<p><b>' + productName[index] + '</b><br>' + productDescription[index] + '</p>' +
                            '<a class="sendfeedback-button"  onclick="closeForm(\''+productId[index]+'\')">' + button1 + '</a> ' +
                            '<a class="sendfeedback-button"  onclick="deleteForm(\''+productId[index]+'\')">' + button3 + '</a> ' +
                            ' </div>' +
                            '<div class="item3" style="grid-column: 2/3; grid-row: 1/2;">' +
                            '<img src="' + productImageSource[index] + '" alt="' + productType[index] + '">' +
                            '</div></div>';
                    } else {
                        document.getElementById("products").innerHTML +=
                            ' <div class="container2" id="container2">' +
                            '<div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + index + '">' +
                            '<p><b>' + productName[index] + '</b><br>' + productDescription[index] + '</p>' +
                            '<a class="sendfeedback-button" href="' + productCategory[index]+'/'+productId[index] + '/' + windowLocSeeStats+'">' + button2 + '</a> ' +
                            '<a class="sendfeedback-button"  onclick="deleteForm(\''+productId[index]+'\')">' + button3 + '</a> ' +
                            ' </div>' +
                            '<div class="item3" style="grid-column: 2/3; grid-row: 1/2;">' +
                            '<img src="' + productImageSource[index] + '" alt="' + productType[index] + '">' +
                            '</div></div>';

                    }
                }
            });
    } catch (e) {
        console.log(e);
    }
}


async function deleteForm(id) {


    const jwtToken = getJWTToken();

    try {
        const response = await fetch('http://127.0.0.1:3003/api/v1/products/'+id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization': `Bearer ${jwtToken}`,
            },
        });
        console.log(response)
        // if (!response.ok) {
        //     throw new Error('Deletion failed!');
        // }

        const json = await response.json();
        console.log("[updateinfo]", json.route);
        console.log("[response]", json.message);
        window.location.href = json.route;
        window.alert(json.message);
    } catch (error) {
        console.error(error);
    }

}



async function closeForm(id) {


    const jwtToken = getJWTToken();

    try {
        const response = await fetch('http://127.0.0.1:3003/api/v1/products/status/'+id, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization': `Bearer ${jwtToken}`,
            },
            //body
        });
        console.log(response)
        // if (!response.ok) {
        //     throw new Error('Deletion failed!');
        // }
        const json = await response.json();
        console.log("[updateinfo]", json.route);
        console.log("[response]", json.message);
        window.location.href = json.route;
        window.alert(json.message);
    } catch (error) {
        console.error(error);
    }

}