

function getIntensityNames(intensityNumber, emotionType) {
    var emotion = document.getElementById('emotion' + emotionType).value;
    if (emotion == "happy") {
        if (intensityNumber == 0) {
            return "Serenity";
        }
        else if (intensityNumber == 1) {
            return "Joy";
        }
        else if (intensityNumber == 2) {
            return "Ecstasy";
        }

    }
    else if (emotion == "surprised") {
        if (intensityNumber == 0) {
            return "Amazement";
        }
        else if (intensityNumber == 1) {
            return "Surprised";
        }
        else if (intensityNumber == 2) {
            return "Distraction";
        }
    }

    else if (emotion == "sad") {
        if (intensityNumber == 0) {
            return "Pensiveness";
        }
        else if (intensityNumber == 1) {
            return "Sadness";
        }
        else if (intensityNumber == 2) {
            return "Grief";
        }
    }

    else if (emotion == "fearful") {
        if (intensityNumber == 0) {
            return "Apprehension";
        }
        else if (intensityNumber == 1) {
            return "Fear";
        }
        else if (intensityNumber == 2) {
            return "Terrror";
        }
    }

    else if (emotion == "discusted") {
        if (intensityNumber == 0) {
            return "Boredom";
        }
        else if (intensityNumber == 1) {
            return "Disgust";
        }
        else if (intensityNumber == 2) {
            return "Loathing";
        }
    }
    else if (emotion == "angry") {
        if (intensityNumber == 0) {
            return "Annoyance";
        }
        else if (intensityNumber == 1) {
            return "Anger";
        }
        else if (intensityNumber == 2) {
            return "Rage";
        }
    }
    else if (emotion == "appreciation") {
        if (intensityNumber == 0) {
            return "Acceptance";
        }
        else if (intensityNumber == 1) {
            return "Trust";
        }
        else if (intensityNumber == 2) {
            return "Admiration";
        }
    }
    else if (emotion == "expectant") {
        if (intensityNumber == 0) {
            return "Interest";
        }
        else if (intensityNumber == 1) {
            return "Anticipation";
        }
        else if (intensityNumber == 2) {
            return "Vigilance";
        }
    }

}

function showHowManyTimes() {
    var numberOfTimes = 5;

}

function sendFeedback() {
    var numberOfTimes = 5;

}

function repeatEmotion() {
    var i;
    for (i = 0; i < 4; i++) {
        document.getElementById("repeat-emotions").innerHTML += '<fieldset class="emotions" id="emotions' + i + '"> <legend>Thing-to-be-reviewed</legend><div class="emotion-section"> <label for="emotion' + i + '">Choose an emotion<label><br> <select name="emotion' + i + '" id="emotion' + i + '"> <option value="happy">Happy</option><option value="surprised">Surprised</option><option value="sad">Sad</option><option value="fearful">Fearful</option>  <option value="discusted">Discusted</option>  <option value="angry">Angry</option> <option value="appreciation">Apreciation</option>  <option value="expectant">Expectant</option> </select></div> <div class="intensity-section">  <label for="intensity">Choose an intensity</label> <form oninput="x.value=getIntensityNames(parseInt(intensity.value),' + i + ');">   <input type="range" value="1" max="2" id="intensity" name="intensity"><br><br>  <output name="x" for="intensity"> <p>  </p></output>  </form> </div> </fieldset> </div><br><br>';
    }
}

function repeatEmotion1() {
    var i;
    var begin = 4;
    for (i = begin; i < begin + 4; i++) {
        document.getElementById("repeat-emotions1").innerHTML += '<fieldset class="emotions" id="emotions' + i + '"> <legend>Thing-to-be-reviewed</legend><div class="emotion-section"> <label for="emotion' + i + '">Choose an emotion<label><br> <select name="emotion' + i + '" id="emotion' + i + '"> <option value="happy">Happy</option><option value="surprised">Surprised</option><option value="sad">Sad</option><option value="fearful">Fearful</option>  <option value="discusted">Discusted</option>  <option value="angry">Angry</option> <option value="appreciation">Apreciation</option>  <option value="expectant">Expectant</option> </select></div> <div class="intensity-section">  <label for="intensity">Choose an intensity</label> <form oninput="x.value=getIntensityNames(parseInt(intensity.value),' + i + ');">   <input type="range" value="1" max="2" id="intensity" name="intensity"><br><br>  <output name="x" for="intensity"> <p>  </p></output>  </form> </div> </fieldset> </div><br><br>';
    }
}