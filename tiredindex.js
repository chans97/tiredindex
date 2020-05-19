// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel

//__________________________________________종합 피로지수 _____________________________________________
const indexDiv = document.getElementById("index")
const weightTired = 1.58
const weightGood = 0.1
const minlndex = 0.25
const totalrate = 0.75
const realname = ["눈가 피로", "피부결 피로", "피부 피로누적", "얼굴 붓기"]
var URL = "https://teachablemachine.withgoogle.com/models/x8l2RqV3V/";

var model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function initTotal() {
    var URL = "https://teachablemachine.withgoogle.com/models/x8l2RqV3V/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();



    // append elements to the DOM
    labelContainer = document.getElementById("label-container-total");
    for (let i = 0; i < maxPredictions; i++) { // and class labels

        labelContainer.appendChild(document.createElement("div"));
    }

    predictTotal();
    init();
}

// run the webcam image through the image model
async function predictTotal() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById("face-image")
    const prediction = await model.predict(image, false);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);

        if (prediction[i].className === `tired`) {
            var tiredindex = prediction[i].probability.toFixed(2)
        } else {
            var goodindex = prediction[i].probability.toFixed(2)
        }
    }
    var index = (minlndex + ((tiredindex * weightTired) + (goodindex * weightGood)) * totalrate) * 100
    var index = Math.round(index * 100) / 100
    var tiredindex = tiredindex * 100
    var tiredindex = Math.round(tiredindex * 100) / 100
    if (index > 100) {
        indexDiv.innerText = `현재 피곤도 : ${tiredindex}%`
    } else {
        indexDiv.innerText = `현재 피곤도 : ${index}%`
    }


}


//__________________________________________zone별 피로지수 _____________________________________________

async function init() {
    var URL = "https://teachablemachine.withgoogle.com/models/0pTEc9Ua5/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();



    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels

        labelContainer.appendChild(document.createElement("div"));
    }

    predict();
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById("face-image")
    const prediction = await model.predict(image, false);
    for (let i = 0; i < maxPredictions; i++) {
        prediction[i].className = realname[i]
    }
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var resultmessage;
    switch (prediction[0].className) {
        case realname[0]:
            resultmessage = "눈가 피로(다크서클, 눈주름 등)"
            break;
        case realname[1]:
            resultmessage = "피부결 피로(각질, 유분 과다 분비 등)"
            break;
        case realname[2]:
            resultmessage = "피부 피로누적(기미, 잡티, 울긋불긋 등)"
            break;
        case realname[3]:
            resultmessage = "얼굴 붓기"
            break;

        default:
            resultmessage = "사진을 다시 찍어주세요."

    }
    $(".result-message").html(resultmessage);

    $("#waiting").slideUp(600)
    $("#checkresult").slideDown(600)





    for (let i = 0; i < maxPredictions; i++) {
        var zoneindex = prediction[i].probability.toFixed(2) * 100
        var zoneindex = Math.round(zoneindex * 100) / 100
        console.log(zoneindex)
        const classPrediction =
            prediction[i].className + ": " + zoneindex + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}


function showresult() {
    $("#checkresult").slideUp(500)
    $("#test-result").slideDown(500)
}

function showzone() {
    $("#checkzone").slideUp(500)
    $("#zoneindex").slideDown(500)
}

function slideupzone() {
    $("#zoneindex").slideUp(500)
    $("#checkzone").slideDown(500)

}