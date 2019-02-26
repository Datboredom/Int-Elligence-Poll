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


function updateBlock() {
    twitch.rig.log('working');
    
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
        updateBlock();
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

function togglePanelShowHide() {
    var formResults = document.getElementById("panelResults");
    if (formResults.style.display === "block") {
        formResults.style.display = "none";
    } else {
        formResults.style.display = "block";
    }
}

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
//function onResetClick() {
//    resetClick += 1;
//    firstclicks = 0;
//    secondclicks = 0;
//    thirdclicks = 0;
//    fourthclicks = 0;
//    document.getElementById("Reset Poll").innerHTML = resetClick;
//    document.getElementById("First").innerHTML = firstclicks;
//    document.getElementById("Second").innerHTML = secondclicks;
//    document.getElementById("Third").innerHTML = thirdclicks;
//    document.getElementById("Fourth").innerHTML = fourthclicks;
//    document.getElementById("formFieldSet").disabled = true;
//    CheckAnswer();
//};

function CheckAnswer() {
    var Answer = "";
    if (Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks) == firstclicks) {
        Answer = "Medieval";
        if (firstclicks == 0){
                    Answer = " ";
        }
    }
    if (Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks) == secondclicks) {
        Answer = "Futuristic";
        if (secondclicks == 0){
                    Answer = " ";
        }
    }
    if (Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks) == thirdclicks) {
        Answer = "Apocalyptic";
        if (thirdclicks == 0){
                    Answer = " ";
        }
    }
    if (Math.max(firstclicks, secondclicks, thirdclicks, fourthclicks) == fourthclicks) {
        Answer = "Modern";
        if (fourthclicks == 0){
            Answer = " ";
        }
    }
    document.getElementById("Answer").innerHTML = Answer;
    return Answer;
}

