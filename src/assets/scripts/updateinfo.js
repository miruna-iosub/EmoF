const form = document.getElementById('accountForm');
form.addEventListener('submit', updateInfo);

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

function get_cookie(name) {
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function updateCookie(name, value, path, expires) {
    const jwtToken = getJWTToken();
    document.cookie = `jwt=${json.information}; expires=${expires}; path=/`;

    window.alert('Cookie updated!');
}


async function updateInfo(event) {
    event.preventDefault();

    // form data
    const email = document.getElementById('username_id_old').value;
    const occupation = document.getElementById('username_id').value;
    const age = document.getElementById('age_id').value;
    const password1 = document.getElementById('password_id').value;
    const password2 = document.getElementById('repeat_password_id').value;
    const jwtToken = getJWTToken();

    try {
        const response = await fetch('http://127.0.0.1:3006/updateinfo', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
                email,
                occupation,
                age,
                password1,
                password2,
            }),
        });
        console.log("[updateInfo]", email, occupation, age, password1, password2, jwtToken);
        console.log(response)
        if (!response.ok) {
            throw new Error('Patch failed');
        }

        const json = await response.json();

        console.log("[updateinfo]", json.information);

        console.log("[response]", json.message);

        window.location.href = json.route;
        window.alert(json.message);
    } catch (error) {
        console.error(error);
        window.alert('Patch failed');
    }
}


async function repeatProductMyAccount() {
    const jwtToken = getJWTToken();
    let numberProd;
    let productImageSource = [];
    let productDescription = [];
    let productName = [];
    let productType = [];
    let productStatus = [];
    try {

        var index = 0;
        fetch('http://127.0.0.1:3003/products/userProducts', {
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
                    productImageSource[index] = prod.picture.toString();
                    productType[index] = prod.type.toString();
                    productDescription[index] = prod.description.toString();
                    productName[index] = prod.name.toString();
                    productStatus[index] = prod.status.toString();
                    console.log(productImageSource);
                    index++;
                })
                numberProd = index;
                var windowLocSeeStats="/charts.html", windowLocClose;
                var button1, button2;
                button1 = "Close Forms";
                button2 = "See Statistics";
                for (index = 0; index < numberProd; index++) {
                    if (productStatus[index] === "ongoing") {
                        document.getElementById("products1").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + index + '"><p><b>' + productName[index] + '</b><br>' + productDescription[index] + '</p><a class="sendfeedback-button" href="' + windowLocClose + '">' + button1 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[index] + '" alt="' + productType[index] + '"></div></div>';
                    } else {
                        document.getElementById("products").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + index + '"><p><b>' + productName[index] + '</b><br>' + productDescription[index] + '</p><a class="sendfeedback-button" href="' + windowLocSeeStats + '">' + button2 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[index] + '" alt="' + productImageSource[index] + '"></div></div>';
                    }
                }
            });
    } catch (e) {
        console.log(e);
    }
}