// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel

//__________________________________________종합 피로지수 _____________________________________________
const indexDiv = document.getElementById("index")
const weightTired = 1.58
const weightGood = 0.1
const minlndex = 0.25
const totalrate = 0.75
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
        labelContainer.childNodes[i].innerHTML = classPrediction;

        labelContainer.childNodes[i].id = prediction[i].className

        if (prediction[i].className === `tired`) {
            var tiredindex = prediction[i].probability.toFixed(2)
        } else {
            var goodindex = prediction[i].probability.toFixed(2)
        }
    }
    var index = minlndex + ((tiredindex * weightTired) + (goodindex * weightGood)) * totalrate
    indexDiv.innerText = `현재 피곤도 : ${index}`


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
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}