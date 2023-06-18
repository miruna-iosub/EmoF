function getIntensityNames(intensityNumber, emotionType) {
    var emotion = document.getElementById('emotion' + emotionType).value;
    if (emotion === "happy") {
        if (intensityNumber === 0) {
            return "serenity";
        } else if (intensityNumber === 1) {
            return "joy";
        } else if (intensityNumber === 2) {
            return "ecstasy";
        }

    } else if (emotion === "surprised") {
        if (intensityNumber === 0) {
            return "amazement";
        } else if (intensityNumber === 1) {
            return "surprised";
        } else if (intensityNumber === 2) {
            return "distraction";
        }
    } else if (emotion === "sad") {
        if (intensityNumber === 0) {
            return "pensiveness";
        } else if (intensityNumber === 1) {
            return "sadness";
        } else if (intensityNumber === 2) {
            return "grief";
        }
    } else if (emotion === "fearful") {
        if (intensityNumber === 0) {
            return "apprehension";
        } else if (intensityNumber === 1) {
            return "fear";
        } else if (intensityNumber === 2) {
            return "terror";
        }
    } else if (emotion === "disgusted") {
        if (intensityNumber === 0) {
            return "boredom";
        } else if (intensityNumber === 1) {
            return "disgust";
        } else if (intensityNumber === 2) {
            return "loathing";
        }
    } else if (emotion === "angry") {
        if (intensityNumber === 0) {
            return "annoyance";
        } else if (intensityNumber === 1) {
            return "anger";
        } else if (intensityNumber === 2) {
            return "rage";
        }
    } else if (emotion === "appreciation") {
        if (intensityNumber === 0) {
            return "acceptance";
        } else if (intensityNumber === 1) {
            return "trust";
        } else if (intensityNumber === 2) {
            return "admiration";
        }
    } else if (emotion === "expectant") {
        if (intensityNumber === 0) {
            return "interest";
        } else if (intensityNumber === 1) {
            return "anticipation";
        } else if (intensityNumber === 2) {
            return "vigilance";
        }
    }

}

async function sendFeedback(idRef) {
    let array= idRef.split("/");
    let id=array[3];

    let emotions = [];
    let where;
    let index = 0;
    let questions = [];
    let fieldsEmotions = document.getElementsByName('x');
    for (let fields of fieldsEmotions) {
        emotions[index] = fields.value.toString().toLowerCase();
        index++;
    }


    for (let index = 0; index < emotions.length; index++) {
        if (emotions[index] === "   ") {
            window.alert('Failed at saving review. Please try again and make sure to fill all fields.');
            window.location.href = idRef;
            return;
        }
    }

    try {
        const response = await fetch('http://localhost:3004/api/v1/review', {
            method: 'POST',
            body: JSON.stringify({
                idProduct: id,
                emotions: emotions,
            }),
        });

        const json = await response.json();
        if (window.location.href.slice(-18) === 'sendfeedbacklogged') {
            where = 'reviewConfirmationLogged';
        } else {
            where = 'reviewConfirmationUnlogged'
        }
        window.location.href = where;
        // if (!response.ok) {
        //     throw new Error('Eroare');
        //     window.alert('Failed at saving review. Please try again.');
        // }

        console.log(response.body.toString());

    } catch (error) {
        console.error(error);
        //  window.alert('Failed at saving review. Please try again.');
    }

}

function repeatEmotion1(idRef) {
    let id = idRef.toString().substring(22, idRef.lastIndexOf("/"));
    var index = 0;
    let questions = [];
    try {
        fetch('http://localhost:3004/api/v1/sendReview/' + id,

            {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                    data.reviewsFields.forEach(field => {

                        questions = field.fields;
                        //index++;

                    });
                    for (index = 0; index < questions.length; index++) {
                        document.getElementById("repeat-emotions1").innerHTML +=
                            '<fieldset class="emotions" id="emotions' + index + '"> ' +
                            '<legend><b>' + questions[index].toString().substring(0, 1).toUpperCase() + questions[index].toString().substring(1) +
                            '</b></legend><div class="emotion-section"> ' +
                            '<label for="emotion' + index + '">Choose an emotion<label><br> ' +
                            '<select name="emotion' + index + '" id="emotion' + index + '"> ' +
                            '<option value="happy">Happy</option>' +
                            '<option value="surprised">Surprised</option>' +
                            '<option value="sad">Sad</option>' +
                            '<option value="fearful">Fearful</option>  ' +
                            '<option value="disgusted">Disgusted</option>  ' +
                            '<option value="angry">Angry</option> ' +
                            '<option value="appreciation">Apreciation</option>  ' +
                            '<option value="expectant">Expectant</option> ' +
                            '</select>' +
                            '</div> <div class="intensity-section"> ' +
                            ' <label for="intensity">Choose an intensity</label> ' +
                            '<form oninput="x.value=getIntensityNames(parseInt(intensity.value),' + index + ');" >' +
                            '  <input type="range" value="1" max="2" id="intensity" name="intensity" required><br><br> ' +
                            ' <output name="x" for="intensity" id="x"> <p>  </p></output>  ' +
                            '</form> ' +
                            '</div> ' +
                            '</fieldset> ' +
                            '</div><br><br>';
                    }
                }
            );

    } catch (e) {
        console.log(e);
    }
}

function productToReview(idRef) {
    let id = idRef.toString().substring(22, idRef.lastIndexOf("/"));
    var imagePath; //= "../assets/images/rituals.png";
    var type; //= "rituals";
    var productName; //= "The Ritual of Karma Medium Gift Set";
    var productDescription;// = "Inspired by positivity and civility, The Ritual of More set makes the perfect gift for a friend or family member, or just to treat yourself. Enjoy summer energy all year round with these soothing products based on the floral aroma of lotus flower and white tea. The gift box contains a shower foam 200 ml, an interior perfume 250 ml, a body cream 100 g and a body scrub 125 g."
    try {
        fetch('http://localhost:3003/api/v1/products/' + id,

            {method: 'GET'})
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                data.products.forEach(prod => {
                    imagePath = prod.picture.toString();
                    type = prod.type.toString();
                    productDescription = prod.description.toString();
                    productName = prod.name.toString();
                })
                document.getElementById("products5").innerHTML += '<div class="grid-item"> <img src="' + imagePath + '" alt="' + type + '">  </div> <div class="grid-item item2"> <div class="grid-item item2-top">  <h2>' + productName + '</h2>  </div><div class="grid-item item2-bottom"> <p>' + productDescription + '</p> <br> </div></div>';
            });
    } catch (e) {
        console.log(e);
    }
}