var token = "";
var tuid = "";
var ebs = "";

// because who wants to type this every time?
var twitch = window.Twitch.ext;

// create the request options for our Twitch API calls
var requests = {
    set: createRequest('POST', 'retrieveAns'),
    get: createRequest('GET', 'sendAns')
};

function createRequest(type, method) {

    return {
        type: type,
        url: location.protocol + '//localhost:5000/' + method,
        success: updateBlock,
        error: logError
    }
}

function setAuth(token) {
    Object.keys(requests).forEach((req) => {
        twitch.rig.log('Setting auth headers');
        requests[req].headers = { 'Authorization': 'Bearer ' + token }
    });
}

twitch.onContext(function (context) {
    twitch.rig.log(context);
});

twitch.onAuthorized(function (auth) {
    // save our credentials
    token = auth.token;
    tuid = auth.userId;
    channelId = auth.channelId;

    setAuth(token);
    $.ajax(requests.get);
});

function answerUpdates() {
    //var firstButton = document.getElementById("FirstAns");
    //var secondButton = document.getElementById("SecondAns");
    //var thirdButton = document.getElementById("ThirdAns");
    //var fourthButton = document.getElementById("FourthAns");

    //firstButton.onclick = window.setInterval(onFirstClick, 3000);
    //secondButton.onclick = window.setInterval(onSecondClick, 3000);
    //thirdButton.onclick = window.setInterval(onThirdClick, 3000);
    //fourthButton.onclick = window.setInterval(onFourthClick, 3000);
    
};
window.setInterval(CheckAnswer, 3000);
function updateBlock() {
    twitch.rig.log('working');
    //answerUpdates();
}

function logError(_, error, status) {
    twitch.rig.log('EBS request returned ' + status + ' (' + error + ')');
}

function logSuccess(status) {
    // we could also use the output to update the block synchronously here,
    // but we want all views to get the same broadcast response at the same time.
    twitch.rig.log('EBS request returned ' + ' (' + status + ')');
}

$(function () {

    // CHECK HERE (.data)
    $('#retrieveAns').data(function () {
        if (!token) { return twitch.rig.log('Not authorized'); }
        twitch.rig.log('Requesting an answer');
        $.ajax(requests.set);
    });

    // listen for incoming broadcast message from our EBS
    twitch.listen('global', function (target, contentType) {
        twitch.rig.log('Received answers.');
    });
});

function toggleShowHide() {
    var form = document.getElementById("formFieldSet");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

var firstclicks = 0;
var secondclicks = 0;
var thirdclicks = 0;
var fourthclicks = 0;

    function onFirstClick() {
        firstclicks++;
        document.getElementById("First").innerHTML = firstclicks;
        document.getElementById("formFieldSet").disabled = true;
        Answer = topAnswer;
    };
    function onSecondClick() {
        secondclicks++;
        document.getElementById("Second").innerHTML = secondclicks;
        document.getElementById("formFieldSet").disabled = true;
        Answer = topAnswer;
    };
    function onThirdClick() {
        thirdclicks++;
        document.getElementById("Third").innerHTML = thirdclicks;
        document.getElementById("formFieldSet").disabled = true;
        Answer = topAnswer;
    };
    function onFourthClick() {
        fourthclicks++;
        document.getElementById("Fourth").innerHTML = fourthclicks;
        document.getElementById("formFieldSet").disabled = true;
        Answer = topAnswer;
    };

function onResetClick() {
    //if (twitch.ext.onAuthorized(function (auth) {
    //    twitch.rig.log(auth.userId);
    //}))
    document.getElementById("formFieldSet").disabled = false;
    toggleShowHide();
    //resetClick += 1;
    //firstclicks = 0;
    //secondclicks = 0;
    //thirdclicks = 0;
    //fourthclicks = 0;
    // document.getElementById("Reset_Poll").innerHTML = resetClick;
    document.getElementById("First").innerHTML = firstclicks;
    document.getElementById("Second").innerHTML = secondclicks;
    document.getElementById("Third").innerHTML = thirdclicks;
    document.getElementById("Fourth").innerHTML = fourthclicks;
    document.getElementById("Answers").innerHTML = Answer;
    CheckAnswer();
};

var Answer;
var topAnswer;
function CheckAnswer() {
    topAnswer = Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks);
    if (topAnswer == firstclicks) {
        Answer = "Medieval";
    }
    if (topAnswer == secondclicks) {
        Answer = "Futuristic";
    }
    if (topAnswer == thirdclicks) {
        Answer = "Apocalyptic";
    }
    if (topAnswer == fourthclicks) {
        Answer = "Modern";
    }
    
    document.getElementById("Answer").innerHTML = Answer;
    document.getElementById("AllAnswers").innerHTML = topAnswer;
    
}




/* Viewer.js Changes: added AnswerUpdates, works (kinda) if you add set interval function. Made variables global. 
 * Added Answer = topAnswer to each onClicks function. **You chose** almost works the way it's supposed to.
 * Added onAuth function to resetclicks. Commented out variable initializations in resetclicks. Made Answer
 * and topAnswer global. **Everybody chose** only prints value of Answer, instead of max answer (topAnswer).
 * 
 * Panel.html Changes: Added better IDs to each button. Added new html for topAnswer.
 * 
 * check differences between IDs in panel. continue building onAuth function to filter out brocaster view. */