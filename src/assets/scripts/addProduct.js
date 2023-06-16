var category;
var subcategory;
var questions=[];

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
                document.getElementById("questions-checkboxes").innerHTML +='<div class="question-checkboxes" id="questions-checkboxes1"></div>'

                for (let index = 0; index < questions.length; index++) {
                    document.getElementById("questions-checkboxes1").innerHTML +=
                        ' <input type="checkbox" name="defaultQuests" value="' + questions[index] + '" id="'+questions[index]+'">' +
                        '<label for="question">' + questions[index] + '</label>';
                }
            });
    } catch (e) {
        console.log(e);
    }
}

async function addProduct() {
   // event.preventDefault();

    const input = document.getElementById("picture").querySelector("input");
    const output = document.querySelector("output");
    // let picture = []
    // input.addEventListener("change", () => {
    //     const file = input.files
    //     picture=file[0];
    // });

    let username="ok";/////////////////
    let name = document.getElementById("name").value.toString();
    let description = document.getElementById("description").value.toString();
    let type = document.getElementById("type").value.toString();
    let picture = "idk yet";///////////////
    let status = "ongoing";
    let expirationDate = document.getElementById("expiration-date").value.toString();
    let newFormFields = document.getElementById("new-question").value.toString().split( ",");
//    let allDefaultForms = document.getElementsByName("questions-checkboxes");
    let index=newFormFields.length;
    for(let checkbox of document.getElementsByName("defaultQuests")){
        console.log(checkbox.checked);
        console.log(checkbox.value);
        console.log(checkbox.name);

    if(checkbox.checked){
        newFormFields[index]=checkbox.value.toString();
        index++;
    }
}

    try {
        const response = await fetch('http://localhost:3003/products', {
            method: 'POST',
            body: JSON.stringify({
                username:username,
                name:name,
                description:description,
                type:type,
                picture:picture,
                status:status,
                category:category,
                subcategory:subcategory,
                expirationDate:expirationDate,
                formFields:newFormFields,
            }),
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error('Posting product failed');
        }

        console.log(`http://localhost:3003{json.route}`)
        window.location.href ="https://localhost:4000/addaproductconfirmation.html"
        window.alert(json.message)
    } catch (error) {
        console.error(error);
        window.alert('Posting product failed');
    }
}
