var index = 0;
var startTime;
var model_sequence = ['digestive', 'drill', 'fork', 'head'];
var method_sequence = ['m1', 'm2'];
var timeout = 1000;


function changeImg() {
    const img = document.getElementById("target-img");
    const id = sequence[index++];
    if (id != undefined) {
        img.src = `image${id}.png`;
        timerStart();
    } else {
        // the end of test
        img.src = "image.png";
        endTest();
    }
}

function labelClick(label_no) {
    var completionTime = timerStop();
    var error;
    if (label_no < 0) {
        error = label_no;
    } else {
        error = label_no == sequence[index - 1] ? 0 : 1;
    }

    // send data
    // time + error + model
    var data = [];
    data.push({ name: 'Model', value: model });
    data.push({ name: 'Time',  value: completionTime });
    data.push({ name: 'Error', value: error });

    Transfer.sendData(partToken, data);
    // change img
    setTimeout(changeImg, timeout);
}

function startTest() {
    var counter = localStorage.getItem("counter");
    if (counter != undefined) {
        localStorage.setItem("counter", Number(counter)+1);
    } else {
        // first time
        localStorage.setItem("counter", 1);
    }

    document.getElementById("start").disabled = true;
    document.getElementById("cannotDecide").disabled = false;
    document.getElementById("noLabel").disabled = false;
    setTimeout(changeImg, timeout);
}

function endTest() {
    document.getElementById("cannotDecide").disabled = true;
    document.getElementById("noLabel").disabled = true;
    document.getElementById("start").disabled = true;

    $("#img-container").remove();

    var counter = Number(localStorage.getItem("counter"));
    var model_index = counter % model_sequence.length;

    if (model_index == 0) {
        window.location.replace("../finish.html");
    } else {
        document.write('Redirecting...');
        redirectToNextModel('../');
    }
}

function redirectToNextModel(path) {
    setTimeout(function() {
        var counter = Number(localStorage.getItem("counter"));
        var model_index = counter % model_sequence.length;
        var model = model_sequence[model_index];
        var adder = Math.ceil((counter+1)/model_sequence.length) % 2;
        var method_index = (counter + adder + 1) % method_sequence.length;
        var method = method_sequence[method_index];

        window.location.replace(`${path}${model}_${method}/index.html`);
    }, timeout);
}

function timerStart() {
    startTime = window.performance.now();
}

function timerStop() {
    return window.performance.now() - startTime;
}

