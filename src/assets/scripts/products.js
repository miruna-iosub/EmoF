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
    var productDescription = "MATOA Way Kambas Maple comes with a material form of Canadian Maple.";
    document.getElementById("products3").innerHTML += ' <div class="grid-container" id="productoftheweek"><div class="grid-item"><img src="' + location + '" alt="' + type + '"></div> <div class="grid-item item2"> <div class="grid-item item2-top"> <h2>Product Of The Week</h2></div> <div class="grid-item item2-bottom"><p>' + productDescription + '</p> </div> <div class="sendfeedback-button"> <a href="sendfeedbackunlogged.html">Send Feedback</a> </div> </div> </div>';
}

function repeatProduct() {
    var i;
    var productImageSource = ["../assets/images/sunglasses.png", '../assets/images/artefacts.png', '../assets/images/arizona.png', '../assets/images/painting.png'];
    var productDescription = ['Elevate your style with these luxurious and fashionable eyewear pieces from one of the most iconic brands in the world.', 'Artefacts exist as a result of behavioural and transformational processes, manufacturing these for a specific purpose and then discarding after use.', 'Arizona\'s Green Tea is a premium blend of green tea, with just the right amount of ginseng, honey and cane sugar. 100% NATURAL: Contains 100% natural green tea.', 'Green wall art is a great way to bring a bit of nature into your space, or just to channel the calming influence of the outdoors. Green is proven to calm us, so introduce this colour in sleeping or resting spaces.'];
    var productName = ['Luxorius Eyewear', 'Gift an Artefact', 'Arizona Green Tea', 'Green Wall Art'];
    var productType = ['sunglasses', 'art', 'art', 'painting'];
    var windowLoc;
    var button1, button2;
    var oneContainer = 0;
    if (window.location.href.slice(-20) === "products-logged.html" || window.location.href.slice(-22) === "homepage-loggedin.html")
        windowLoc = 'sendfeedbacklogged.html';
    else if (window.location.href.slice(-22) === "products-unlogged.html" || window.location.href.slice(-24) === "homepage-unloggedin.html")
        windowLoc = 'sendfeedbackunlogged.html';
    if (window.location.href.slice(-22) === "products-unlogged.html" || window.location.href.slice(-20) === "products-logged.html")
        oneContainer = 1;
    if (window.location.href.slice(-14) === "myaccount.html") {
        button1 = "Delete Form";
        button2 = "See Statistics";
        windowLoc = "deleteproductconfirmation.html";
    }
    else {
        button1 = button2 = "Send Feedback";
    }

    for (i = 0; i < 4; i++) {
        document.getElementById("products").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + i + '"><p><b>' + productName[i] + '</b><br>' + productDescription[i] + '</p><a class="sendfeedback-button" href="' + windowLoc + '">' + button1 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[i] + '" alt="' + productType[i] + '"></div></div>';
        if (oneContainer != 1)
            document.getElementById("products1").innerHTML += ' <div class="container2" id="container2"><div class="item3" style="grid-column: 1/2; grid-row: 1/2;" id="product' + i + '"><p><b>' + productName[i] + '</b><br>' + productDescription[i] + '</p><a class="sendfeedback-button" href="' + windowLoc + '">' + button2 + '</a>  </div><div class="item3" style="grid-column: 2/3; grid-row: 1/2;"><img src="' + productImageSource[i] + '" alt="' + productType[i] + '"></div></div>';
    }
}


function addBasic() {
    var location = "../assets/images/rituals.png";
    var type = "product";

    var productDescription, linkedTo, productHeader;
    if (window.location.href.slice(-22) === "homepage-unlogged.html") {
        productDescription = "Are you interested in receiving honest reviews on something? You can add your products, services, art, even yourself.<br>Create an account and add your first product.";
        productHeader = "Create an account or log in to add!";
        linkedTo = "signup.html";
        button = "Sign Up Now";
    }

    else {
        productDescription = "Do you want to receive honest reviews on something? You can add your products, services, art, even yourself.";
        productHeader = "Are you interested in seeing clients' emotions with accurate charts?";
        linkedTo = "addaproduct.html";
        button = "Add A Product";
    }
    document.getElementById("products4").innerHTML += ' <div class="grid-containerblank" id="addbasic"><div class="grid-item"><img src="' + location + '" alt="' + type + '"></div> <div class="grid-item item2"> <div class="grid-item item2-top"> <h2>' + productHeader + '</h2></div> <div class="grid-item item2-bottom"><p>' + productDescription + '</p> <br></div> <div class="sendfeedback-button"> <a href="' + linkedTo + '">' + button + '</a> </div> </div> </div>';

}


function productToReview() {

    var imagePath = "../assets/images/rituals.png";
    var type = "rituals";
    var productName = "The Ritual of Karma Medium Gift Set";
    var productDescription = "Inspired by positivity and civility, The Ritual of More set makes the perfect gift for a friend or family member, or just to treat yourself. Enjoy summer energy all year round with these soothing products based on the floral aroma of lotus flower and white tea. The gift box contains a shower foam 200 ml, an interior perfume 250 ml, a body cream 100 g and a body scrub 125 g."
    document.getElementById("products5").innerHTML += '<div class="grid-item"> <img src="' + imagePath + '" alt="' + type + '">  </div> <div class="grid-item item2"> <div class="grid-item item2-top">  <h2>' + productName + '</h2>  </div><div class="grid-item item2-bottom"> <p>' + productDescription + '</p> <br> </div></div>';
}

