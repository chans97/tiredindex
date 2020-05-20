// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel

//__________________________________________종합 피로지수 _____________________________________________
const indexDiv = document.getElementById("index")
const weightTired = 1.58
const weightGood = 0.1
const minlndex = 0.20
const totalrate = 0.80
const realname = ["눈가 피로", "피부결 피로", "기미 잡티", "얼굴 붓기"]
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
        var resultindex = tiredindex;
    } else {
        var resultindex = index;
    }
    var innerdiv = `<div class="w-2/12"><span class="tiredindex-class">피로도</span></div>
    <div class="w-10/12 h-5 bg-red-200 rounded rounded-lg">
        <div id="totalBar" name="${resultindex}" class="h-5 rounded rounded-lg flex flex-row items-center justify-center bg-red-500"
            style="width: 0%"; >
            <span class="tiredindex-class text-white">${resultindex}%</span>
        </div>
    </div>`
    indexDiv.innerHTML = innerdiv



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
        var divforzone = document.createElement("div");
        divforzone.setAttribute("class", "w-full flex flex-row justify-between items-center my-3");
        labelContainer.appendChild(divforzone);
    }

    predict();
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById("face-image")
    const prediction = await model.predict(image, false);
    for (let i = 0; i < maxPredictions; i++) {
        prediction[i].name = realname[i]
    }
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var resultmessage;
    switch (prediction[0].name) {
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
            `
            <div class="w-3/12"><span class="tiredindex-class">${prediction[i].name}</span></div>
            <div class="w-9/12 h-5 rounded rounded-lg ${prediction[i].className}">
                <div id="${prediction[i].className}" name="${zoneindex}"
                    class="px-3 h-5 rounded rounded-lg flex flex-row items-center justify-center ${prediction[i].className}bar"
                    style="width: 0%">
                    <span class="tiredindex-class text-white">${zoneindex}%</span>
                </div>
            </div>
        `
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}


function showresult() {
    $("#checkresult").slideUp(500)
    $("#test-result").slideDown(500)
    var resultindex = $("#totalBar").attr('name')
    $("#totalBar").animate({ width: `${resultindex}%` }, 1000)
}

function showzone() {
    $("#checkzone").slideUp(500);
    $("#zoneindex").slideDown(500);
    var resultindex = $("#zone1").attr('name');
    $("#zone1").animate({ width: `${resultindex}%` }, 1500);
    var resultindex = $("#zone2").attr('name');
    $("#zone2").animate({ width: `${resultindex}%` }, 1500);
    var resultindex = $("#zone3").attr('name');
    $("#zone3").animate({ width: `${resultindex}%` }, 1500);
    var resultindex = $("#zone4").attr('name');
    $("#zone4").animate({ width: `${resultindex}%` }, 1500);


}

function slideupzone() {

    $("#zone1").animate({ width: `0%` }, 800);
    $("#zone2").animate({ width: `0%` }, 800);
    $("#zone3").animate({ width: `0%` }, 800);
    $("#zone4").animate({ width: `0%` }, 600, function () { $("#checkzone").slideDown(600); $("#zoneindex").slideUp(600); });


}
