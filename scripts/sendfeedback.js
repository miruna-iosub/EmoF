//function multiplyNode(node, count, deep) {
//   for (var i = 0, copy; i < count - 1; i++) {
//      copy = node.cloneNode(deep);
//      node.parentNode.insertBefore(copy, node);
//  }
//}

//multiplyNode(document.querySelector('.repeat-emotion'), 5, true);

//var amount = 5;
//for (var i = 0; i < amount; i++) {
//    var new_div = document.getElementById("repeat-emotion");
//    new_div.className = "item4";
///    document.body.appendChild(new_div);
///    console.log("This is repeat " + i);
//}
/*
var container = document.getElementById('repeat-emotion');

function block(mClass, html) {
    //extra html you want to store.
    return '<div class="' + mClass + '">' + html + '</div>';
}

//    code that loops and makes the blocks.
//    first part: creates var i
//    second:     condition, if 'i' is still smaller than three, then loop.
//    third part: increment i by 1;
for (var i = 0; i < 3; i++) {
    // append the result of function 'block()' to the innerHTML
    // of the container.
    container.innerHTML += block('item3', 'heiii');
}
*/

// create class builder.
class Builder {
    //    create constructor, accept an element selector, i.e #container.
    constructor(targetContainerSelector) {
        //  search element by given selector and store it as a property.
        this.targetContainer = document.querySelector(targetContainerSelector);
    }

    //  method to append to innerHtml of target container.
    appendUsingInnerHtml(divAsHtml) {
        this.targetContainer.innerHTML += divAsHtml;
    }

    //    method to append to target container using DOM elements.
    appendUsingDom(divAsDom) {
        this.targetContainer.appendChild(divAsDom);
    }
}

//  constant to hold element selector.
const myTargetContainer = 'repeat-emotions';
//  constant to set the class if required.
const myDivClass = 'item3';

//  constant to hold the instantiated Builder object.
const builder = new Builder(myTargetContainer);

//  loop 3 times.
for (let i = 0; i < 3; i++) {
    // call method to append to target container using innerHtml.
    builder.appendUsingInnerHtml(``);


    // OR.. build using DOM objects.

    //    create the div element.
    const div = document.createElement('div');

    //    create text element, add some text to it and append it to created div.
    div.appendChild(document.createTextNode('dom div text'));

    //    call method to append div DOM object to target container.
    builder.appendUsingDom(div);
}




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
            return "Intreset";
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




//function showFieldXTimes() {
//   var numberOfTmes = 5;
//   var i;
///   var outputStrig;
//   for (i = 0; i < numberOfTmes; i++) {
////       outputStrig = outputStrig + "<fieldset class=\"emotions\">< legend > Thing - to - be - reviewed</legend ><div class=\"emotion-section\"><div class=\"emotion-section\"> <label for=\"emotion\">Choose an emotion</label><br><select name=\"emotion\" id=\"emotion\"><option value=\"happy\">Happy</option><option value=\"surprised\">Surprised</option><option value=\"sad\">Sad</option><option value=\"fearful\">Fearful</option><option value=\"discusted\">Discusted</option><option value=\"angry\">Angry</option><option value=\"appreciation\">Apreciation</option><option value=\"expectant\">Expectant</option>    </select>  </div> </div> <div class=\"intensity-section\"> <label for=\"intensity\">Choose an intensity</label> <form oninput=\"x.value=getIntensityNames(parseInt(intensity.value));\"> <input type=\"range\" value=\"1\" max=\"2\" id=\"intensity\" name=\"profeciency\"><br><br>  <output name=\"x\" for=\"intensity\"> <p>  <p></output></form></div> </fieldset>";
//   }
//   return outputStrig;
//}/

//function multiplyNode(node, count, deep) {
//   for (var i = 0, copy; i < count - 1; i++) {
//       copy = node.cloneNode(deep);
//        node.parentNode.insertBefore(copy, node);
//    }
//}

//multiplyNode(document.querySelector('.emotions'), 5, true);

//function repeatEmotion() {
//    var i;
 //   for (i = 0; i < 4; i++) {
 //       document.getElementById("emotions").innerHTML += '<fieldset class=\"emotions\">< legend> Thing to be reviewed</legend><div class=\"emotion-section\"><div class=\"emotion-section\"> <label for=\"emotion\">Choose an emotion</label><br><select name=\"emotion\" id=\"emotion\"><option value=\"happy\">Happy</option><option value=\"surprised\">Surprised</option><option value=\"sad\">Sad</option><option value=\"fearful\">Fearful</option><option value=\"discusted\">Discusted</option><option value=\"angry\">Angry</option><option value=\"appreciation\">Apreciation</option><option value=\"expectant\">Expectant</option>    </select>  </div> </div> <div class=\"intensity-section\"> <label for=\"intensity\">Choose an intensity</label> <form oninput=\"x.value=getIntensityNames(parseInt(intensity.value));\"> <input type=\"range\" value=\"1\" max=\"2\" id=\"intensity\" name=\"profeciency\"><br><br>  <output name=\"x\" for=\"intensity\"> <p>  </p></output></form></div> </fieldset>';
//    }
//}