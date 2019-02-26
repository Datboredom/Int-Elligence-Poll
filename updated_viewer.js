var firstclicks = 0;
function onFirstClick() {
    firstclicks += 1;
    document.getElementById("First").innerHTML = firstclicks;
    document.getElementById("formFieldSet").disabled = true;
    CheckAnswer();
};
var secondclicks = 0;
function onSecondClick() {
    secondclicks += 1;
    document.getElementById("Second").innerHTML = secondclicks;
    document.getElementById("formFieldSet").disabled = true;
    CheckAnswer();
};

var thirdclicks = 0;
function onThirdClick() {
    thirdclicks += 1;
    document.getElementById("Third").innerHTML = thirdclicks;
    document.getElementById("formFieldSet").disabled = true;
    CheckAnswer();
};
var fourthclicks = 0;
function onFourthClick() {
    fourthclicks += 1;
    document.getElementById("Fourth").innerHTML = fourthclicks;
    document.getElementById("formFieldSet").disabled = true;
    CheckAnswer();
};
//var resetClick = 0;
function onResetClick() {
    document.getElementById("formFieldSet").disabled = false;
    //resetClick += 1;
    firstclicks = 0;
    secondclicks = 0;
    thirdclicks = 0;
    fourthclicks = 0;
   // document.getElementById("Reset_Poll").innerHTML = resetClick;
    document.getElementById("First").innerHTML = firstclicks;
    document.getElementById("Second").innerHTML = secondclicks;
    document.getElementById("Third").innerHTML = thirdclicks;
    document.getElementById("Fourth").innerHTML = fourthclicks;
    CheckAnswer();
};
function CheckAnswer() {
    var Answer = "";
    if (Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks) == firstclicks) {
        Answer = "Medieval";
    }
    if (Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks) == secondclicks) {
        Answer = "Futuristic";
    }
    if (Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks) == thirdclicks) {
        Answer = "Apocalyptic";
    }
    if (Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks) == fourthclicks) {
        Answer = "Modern";
    }
    document.getElementById("Answer").innerHTML = Answer;
}
function FindMax() {
}
