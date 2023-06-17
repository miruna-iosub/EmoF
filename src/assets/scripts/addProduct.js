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


var category;
var subcategory;
var questions = [];
var fileName;

var today = new Date().toISOString().split('T')[0];
document.getElementsByName("expiration-date")[0].setAttribute('min', today);

// const getBase64StringFromDataURL = (dataURL) =>
//     dataURL.replace('data:', '').replace(/^.+,/, '');
function getPath() {


    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        fileName = reader.result;
        console.log(fileName);
    };
    reader.readAsDataURL(file);

}


function addQuestions() {
    let serviceArray = ['eventOrganiser', 'smallBusiness', 'cleaning', 'clinic'];
    let personArray = ['teacher', 'artist'];
    let productArray = ['skincare', 'drink', 'eyewear'];
    let artefactArray = ['artwork', 'photography', 'homeMade'];
    let geographicalPLaceArray = ['monument', 'mall', 'airport'];
    questions = [];
    var select = document.getElementById('category');
    subcategory = select.options[select.selectedIndex].value;

    if (serviceArray.includes(subcategory)) {
        category = "service"
    } else if (personArray.includes(subcategory)) {
        category = "person"
    } else if (productArray.includes(subcategory)) {
        category = "product"
    } else if (artefactArray.includes(subcategory)) {
        category = "artefact"
    } else if (geographicalPLaceArray.includes(subcategory)) {
        category = "geographicalPlace"
    }
    var e = document.getElementById("category");

    try {
        fetch('http://localhost:3003/products/category/' + category,

            {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let index = 0;
                console.log(data.products);
                for (let field of data.products.fields) {
                    questions[index] = field;
                    index++;
                }


                var elem = document.getElementById("questions-checkboxes1");
                elem.parentNode.removeChild(elem);
                document.getElementById("questions-checkboxes").innerHTML += '<div class="question-checkboxes" id="questions-checkboxes1"></div>'

                for (let index = 0; index < questions.length; index++) {
                    document.getElementById("questions-checkboxes1").innerHTML +=
                        ' <input type="checkbox" name="defaultQuests" value="' + questions[index] + '" id="' + questions[index] + '">' +
                        '<label for="question">' + questions[index] + '</label>';
                }
            });
    } catch (e) {
        console.log(e);
    }
}


async function addProduct() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("expiration-date")[0].setAttribute('min', today);

    let picture = fileName;
    let name = document.getElementById("name").value.toString();
    let description = document.getElementById("description").value.toString();
    let type = document.getElementById("type").value.toString();
    let expirationDate = document.getElementById("expiration-date").value.toString();
    let newFormFields = document.getElementById("new-question").value.toString().split(",");
    let index = newFormFields.length;

    for (let checkbox of document.getElementsByName("defaultQuests")) {
        console.log(checkbox.checked);
        console.log(checkbox.value);
        console.log(checkbox.name);

        if (checkbox.checked) {
            newFormFields[index] = checkbox.value.toString();
            index++;
        }
    }
    if((name===""||description===""||type===""||expirationDate===""||newFormFields.length===0)&&expirationDate!=="") {

    }
    else if(expirationDate==="")
    {
        window.alert('Please fill all the fields.');
        window.location.href = 'addaproduct';
    }
    else {
        try {
            const jwtToken = getJWTToken();

            const response = await fetch('http://127.0.0.1:3003/products', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                    'Authorization': `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({
                    token: jwtToken,
                    name: name,
                    description: description,
                    type: type,
                    picture: picture,
                    category: category,
                    subcategory: subcategory,
                    expirationDate: expirationDate,
                    formFields: newFormFields,
                }),
            });

            const json = await response.json();
            //
            //     if (json.responseBody!=="POST successful.") {
            //         window.window.alert(json.message);
            //         window.location.reload();
            //        // throw new Error('Posting product failed');
            // }
            window.location.href = 'addaproductconfirmation';
            // else {
            //}

        } catch (error) {
            console.error(error);
            window.location.href = 'addaproduct';
            // window.alert('Posting product failed');
        }
    }

}