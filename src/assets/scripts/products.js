function repeatProduct1() {
    var i;

    let products = [
        {
            name: 'Luxorius Eyewear',
            type: 'sunglasses',
            description: 'Elevate your style with these luxurious and fashionable eyewear pieces from one of the most iconic brands in the world.',
            src: '../assets/images/sunglasses.png'
        },
        {
            name: 'Gift an Artefact',
            type: 'art',
            description: 'Artefacts exist as a result of behavioural and transformational processes, manufacturing these for a specific purpose and then discarding after use.',
            src: '../assets/images/artefacts.png'
        },
        {
            name: 'Arizona Green Tea',
            type: 'art',
            description: 'Arizona\'s Green Tea is a premium blend of green tea, with just the right amount of ginseng, honey and cane sugar. 100% NATURAL: Contains 100% natural green tea.',
            src: '../assets/images/arizona.png'
        },
        {
            name: 'Green Wall Art',
            type: 'painting',
            description: 'Green wall art is a great way to bring a bit of nature into your space, or just to channel the calming influence of the outdoors. Green is proven to calm us, so introduce this colour in sleeping or resting spaces.',
            src: '../assets/images/painting.png'
        }
    ]

    var windowLoc;

    if (window.location.href.slice(-20) === "products-logged.html")
        windowLoc = 'sendfeedbacklogged.html';
    else if (window.location.href.slice(-22) === "products-unlogged.html")
        windowLoc = 'sendfeedbackunlogged.html';


    const createImgElementFromProduct = (product) => {
        let img = document.createElement('img');
        img.src = product.src;
        img.alt = product.type;
        return img;
    }

    const createElementFromProduct = (product, index) => {
        let container = document.createElement('div');
        container.id = 'container' + index;
        container.className = 'container2';

        let itemLeft = document.createElement('div');
        container.id = 'item' + index;
        container.className = 'item3';
        container.style.gridColumn = "1/2";
        container.style.gridRow = "1/2";

        let titleAndDescription = document.createElement('p');
        titleAndDescription.innerHTML = `<b>${product.name}</b><br>${product.description}`

        let link = document.createElement('a');
        link.className = 'sendfeedback-button';
        link.href = windowLoc;
        link.textContent = "Send Feedback";

        itemLeft.appendChild(titleAndDescription);
        itemLeft.appendChild(link);

        let itemRight = document.createElement('div');
        container.className = 'item3';
        container.style.gridColumn = "2/3";
        container.style.gridRow = "1/2";
        itemRight.appendChild(createImgElementFromProduct(product));

        container.appendChild(itemLeft);
        container.appendChild(itemRight);
        return container;
    }
    products.forEach((product, index) => {
        let newElementProduct = createElementFromProduct(product, index);
        document.getElementById("products").appendChild(newElementProduct)
    })
}


function productOfTheWeek() {
    var location = "../assets/images/camera.png";
    var type = "camera";
    var productDescription = "Our initiative is to bring closer together any type of provider and their clients. <br>You can become either anytime.<br><br><br>";
    document.getElementById("products3").innerHTML += ' <div class="grid-container" id="productoftheweek"><div class="grid-item"><img src="' + location + '" alt="' + type + '"></div> <div class="grid-item item2"> <div class="grid-item item2-top"> <h2>Emotion-based Feedback</h2></div> <div class="grid-item item2-bottom"><p>' + productDescription + '</p> </div><div class="sendfeedback-button"> <a href="signup.html">Sign Up Now</a> </div> </div> </div>';
}

async function repeatProductHomepageLogged() {
    let numberProd;
    let productImageSource = [];
    let productDescription = [];
    let productName = [];
    let productType = [];
    let productId = [];
    try {
        var index = 0;
        fetch('http://localhost:3003/products/homepage',
            {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                numberProd = parseInt(data.numberProducts);
                data.products.forEach(prod => {
                    if (prod == null) {
                        productId[index] = prod._id.toString();
                        // productImageSource[index] = prod.picture.toString();
                        productType[index] = prod.type.toString();
                        productDescription[index] = prod.description.toString();
                        productName[index] = prod.name.toString();
                        index++;
                    }
                })

                var windowLoc = "sendfeedbacklogged.html";
                var button1, button2;
                var oneContainer = 0;
                oneContainer = 1;
                button1 = button2 = "Send Feedback";
                console.log(productImageSource);
                //    if(numberProd!==4)numberProd = 4;
                let i = 0;
                while (i < numberProd) {
                    document.getElementById("products").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + i + '"><p><b>' + productName[i] + '</b><br>' + productDescription[i] + '</p><a class="sendfeedback-button" href="http://localhost:4000/' + productId[i] + '/' + windowLoc + '">' + button1 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[i] + '" alt="' + productType[i] + '></div></div>';
                    console.log(productId[i] + '/' + windowLoc);
                    i++;
                    if (i < numberProd) {
                        document.getElementById("products1").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + i + '"><p><b>' + productName[i] + '</b><br>' + productDescription[i] + '</p><a class="sendfeedback-button" href="http://localhost:4000/' + productId[i] + "/" + windowLoc + '">' + button2 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[i] + ' alt="' + productType[i] + '></div></div>';
                    }
                    i++;
                }
            });
    } catch (e) {
        console.log(e);
    }
// });
// }).catch(err => console.error(err));
}

async function repeatProductHomepage() {
    let numberProd;
    let productImageSource = [];
    let productDescription = [];
    let productName = [];
    let productType = [];
    let productId = [];
    try {
        var index = 0;
        fetch('http://localhost:3003/products/homepage',

            {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                numberProd = parseInt(data.numberProducts);
                data.products.forEach(prod => {
                    productId[index] = prod._id.toString();
                    productImageSource[index] = prod.picture.toString();
                    productType[index] = prod.type.toString();
                    productDescription[index] = prod.description.toString();
                    productName[index] = prod.name.toString();
                    index++;
                })
                var windowLoc = "sendfeedbackunlogged.html";

                var button1, button2;
                button1 = button2 = "Send Feedback";
                console.log(productImageSource);
                let index1 = 0;
                while (index1 < numberProd) {
                    document.getElementById("products").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + index1 + '"><p><b>' + productName[index1] + '</b><br>' + productDescription[index1] + '</p><a class="sendfeedback-button" href="' + productId[index1] + '/' + windowLoc + '">' + button1 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[index1] + '" alt="' + productType[index1] + '"></div></div>';
                    console.log(productId[productType[index1]] + '/' + windowLoc);
                    index1++;
                    if (index1 < numberProd) {
                        document.getElementById("products1").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + index1 + '"><p><b>' + productName[index1] + '</b><br>' + productDescription[index1] + '</p><a class="sendfeedback-button" href="' + productId[index1] + "/" + windowLoc + '">' + button2 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[index1] + '" alt="' + productType[index1] + '"></div></div>';
                    }
                    index1++;
                }
            });
    } catch (e) {
        console.log(e);
    }
}


async function repeatProductAllUnlogged(givenCategory) {
    let category = givenCategory.toString().substring(22, givenCategory.toString().lastIndexOf("/"));
    let numberProd;
    let productImageSource = [];
    let productDescription = [];
    let productName = [];
    let productType = [];
    let productId = [];

    try {
        var index = 0;
        fetch('http://localhost:3003/products/' + category.toString(),

            {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // numberProd = parseInt(data.numberProducts);
                data.products.forEach(prod => {
                    productImageSource[index] = prod.picture.toString();
                    productType[index] = prod.type.toString();
                    productDescription[index] = prod.description.toString();
                    productName[index] = prod.name.toString();
                    productId[index] = prod._id.toString();
                    console.log(productImageSource);
                    index++;
                })
                numberProd = index;
                var i;
                var windowLoc;
                var button1;

                if (window.location.href.slice(-20) === "products-logged.html" || window.location.href.slice(-22) === "homepage-loggedin.html")
                    windowLoc = 'sendfeedbacklogged.html';
                else if (window.location.href.slice(-22) === "products-unlogged.html" || window.location.href.slice(-24) === "homepage-unloggedin.html")
                    windowLoc = 'sendfeedbackunlogged.html';

                button1 = "Send Feedback";


                for (i = 0; i < numberProd; i++) {
                    document.getElementById("products").innerHTML += ' <div class="container2" id="container2">' +
                        '<div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + i + '">' +
                        '<p><b>' + productName[i] + '</b><br>' + productDescription[i] +
                        '</p><a class="sendfeedback-button" href="http://localhost:4000/' + productId[i] + "/" + windowLoc + '">' + button1 + '</a>  </div>' +
                        '<div class="item3" style="grid-column: 2/3; grid-row: 1/2;">' +
                        '<img src="' + productImageSource[i] + '" alt="' + productType[i] + '" >' +
                        '</div></div>';
                }

                category = category.substring(0, 1).toUpperCase() + category.substring(1, category.length);
                const result = category.split(/(?=[A-Z])/);
                category = result.join(" ");
                document.getElementById("category").innerHTML += '<h2><b>Category: ' + category + '</b></h2>';
            });
    } catch (e) {
        console.log(e);
    }
}


async function repeatProductAllLogged(givenCategory) {
    let category = givenCategory.toString().substring(22, givenCategory.toString().lastIndexOf("/"));
    let numberProd, apiRequest;
    let productImageSource = [];
    let productDescription = [];
    let productName = [];
    let productType = [];
    let productId = [];

    try {

        var index = 0;
        fetch('http://localhost:3003/products/' + category.toString(),

            {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                numberProd = parseInt(data.numberProducts);
                data.products.forEach(prod => {
                    productImageSource[index] = prod.picture.toString();
                    productType[index] = prod.type.toString();
                    productDescription[index] = prod.description.toString();
                    productName[index] = prod.name.toString();
                    productId[index] = prod._id.toString();
                    console.log(productImageSource);
                    index++;
                })

                var i;
                // var productImageSource = ["../assets/images/sunglasses.png", '../assets/images/artefacts.png', '../assets/images/arizona.png', '../assets/images/painting.png'];
                // var productDescription = ['Elevate your style with these luxurious and fashionable eyewear pieces from one of the most iconic brands in the world.', 'Artefacts exist as a result of behavioural and transformational processes, manufacturing these for a specific purpose and then discarding after use.', 'Arizona\'s Green Tea is a premium blend of green tea, with just the right amount of ginseng, honey and cane sugar. 100% NATURAL: Contains 100% natural green tea.', 'Green wall art is a great way to bring a bit of nature into your space, or just to channel the calming influence of the outdoors. Green is proven to calm us, so introduce this colour in sleeping or resting spaces.'];
                // var productName = ['Luxorius Eyewear', 'Gift an Artefact', 'Arizona Green Tea', 'Green Wall Art'];
                // var productType = ['sunglasses', 'art', 'art', 'painting'];
                var windowLoc = "sendfeedbacklogged.html"
                var button1, button2;
                var oneContainer = 0;
                // if (window.location.href.slice(-14) === "myaccount.html") {
                //     button1 = "Delete Form";
                //     button2 = "See Statistics";
                //     windowLoc = "deleteproductconfirmation.html";
                // } else {
                button1 = button2 = "Send Feedback";
                //   }

                for (i = 0; i < numberProd; i++) {
                    document.getElementById("products").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + i + '"><p><b>' + productName[i] + '</b><br>' + productDescription[i] + '</p><a class="sendfeedback-button" href="http://localhost:4000/' + productId[i] + "/" + windowLoc + '">' + button1 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[i] + '" alt="' + productType[i] + '"></div></div>';
                }
                document.getElementById("category").innerHTML += '<h2><b>Category: ' + category + '</b></h2>';
            });
    } catch (e) {
        console.log(e);
    }
// });
// }).catch(err => console.error(err));
}

function addBasic() {
    var location = "../assets/images/rituals.png";
    var type = "product";
    let button;
    var productDescription, linkedTo, productHeader;
    if (window.location.href.slice(-20) === "homepage-logged.html") {
        productDescription = "Do you want to receive honest reviews on something? You can add your products, services, art, even yourself.";
        productHeader = "Are you interested in seeing clients' emotions with accurate charts?";
        linkedTo = "/addaproduct.html";
        button = "Add A Product";
    } else {
        productDescription = "Are you interested in receiving honest reviews on something? You can add your products, services, art, even yourself.<br>Create an account and add your first product.";
        productHeader = "Create an account or log in to add!";
        linkedTo = "/signup.html";
        button = "Sign In Now";
    }
    document.getElementById("products4").innerHTML += ' <div class="grid-containerblank" id="addbasic"><div class="grid-item"><img src="' + location + '" alt="' + type + '"></div> <div class="grid-item item2"> <div class="grid-item item2-top"> <h2>' + productHeader + '</h2></div> <div class="grid-item item2-bottom"><p>' + productDescription + '</p> <br></div> <div class="sendfeedback-button"> <a href="' + linkedTo + '">' + button + '</a> </div> </div> </div>';

}

