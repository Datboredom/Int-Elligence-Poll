var firstclicks = 0;
function onFirstClick() {
    firstclicks += 1;
    document.getElementById("First").innerHTML = firstclicks;
    CheckAnswer();
};
var secondclicks = 0;
function onSecondClick() {
    secondclicks += 1;
    document.getElemenById("Second").innerHTML = secondclicks;
    CheckAnswer();
};

var thirdclicks = 0;
function onThirdClick() {
    thirdclicks += 1;
    document.getElementById("Third").innerHTML = thirdclicks;
    CheckAnswer();
};
var fourthclicks = 0;
function onFourthClick() {
    fourthclicks += 1;
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