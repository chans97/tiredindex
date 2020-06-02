// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel

//__________________________________________종합 피로지수 _____________________________________________
const indexDiv = document.getElementById("index")
const weightTired = 1.6
const weightGood = 0.1
const minlndex = 0.05
const totalrate = 0.70
const realname = ["눈가 피로", "피부 피로", "기미 잡티", "얼굴 붓기"]
const thinking = `<div class="w-full flex flex-col justify-start items-start"><img src="img/thinking.gif" style=" width: 9vh; position:absolute; z-index:3; margin-top: -13vh;"></div>`
const pick = `<div class="w-full flex flex-col justify-start items-start"><img src="img/pick.gif" style=" width: 9vh; position:absolute; z-index:3; margin-top: -13vh;"></div>`
const angry = `<div class="w-full flex flex-col justify-start items-start"><img src="img/angry.gif" style=" width: 12vh; position:absolute; z-index:3; margin-top: -13vh;"></div>`
const hum = `<div class="w-full flex flex-col justify-start items-start"><img src="img/hum.gif" style=" width: 12vh; position:absolute; z-index:3; margin-top: -13vh;"></div>`
const amb = `<div class="w-full flex flex-col justify-start items-start"><img src="img/amb.gif" style=" width: 12vh; position:absolute; z-index:3; margin-top: -13vh;"></div>`

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
    var innerdiv = `<div class="w-2/12 mr-2"><span class="tiredindex-total-class">피로도</span></div>
    <div class="w-10/12 bg-red-200 rounded rounded-xl" style=" height: 3vh;">
        <div id="totalBar" name="${resultindex}" class="rounded rounded-xl flex flex-row items-center justify-center bg-red-500"
            style="width: 0%; height: 3vh;" >
            <span class="tiredindex-class text-white">${resultindex}%</span>
        </div>
    </div>`
    indexDiv.innerHTML = innerdiv

    init(resultindex);
}


//__________________________________________zone별 피로지수 _____________________________________________

async function init(resultindex) {
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

    predict(resultindex);
}

// run the webcam image through the image model
async function predict(resultindex) {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById("face-image")
    const prediction = await model.predict(image, false);
    for (let i = 0; i < maxPredictions; i++) {
        prediction[i].name = realname[i]
    }
    //test
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var resultmessage;
    switch (prediction[0].name) {
        case realname[0]:
            resultmessage = "눈가 피로(다크서클, 눈주름 등)"
            writeResult1(resultindex);
            break;
        case realname[1]:
            resultmessage = "피부 피로(각질, 유분 과다 분비 등)"
            writeResult2(resultindex);
            break;
        case realname[2]:
            resultmessage = "피부 피로누적(기미, 잡티, 울긋불긋 등)"
            writeResult3(resultindex);
            break;
        case realname[3]:
            resultmessage = "얼굴 붓기"
            writeResult4(resultindex);
            break;

        default:
            resultmessage = "사진을 다시 찍어주세요."

    }
    var zonedetail = `<a href="${prediction[0].className}detail.html"><span class="border-b border-black pb-1 hover:text-blue-500 hover:border-blue-500 transition" style="font-size: 2vh;"><i class="fas fa-paste border-b pb-2" style="margin-right:1.3vh"></i>Dr.피로의 맞춤 진단서 받기</span></a>`
    var zonemessage = `<span  class="red-text onelinezone">${resultmessage}</span>`
    $(".zonedetail").html(zonedetail);
    $(".zoneestimate").html(zonemessage);
    $("#waiting").slideUp(200)
    $("#checkresult").slideDown(200)





    for (let i = 0; i < maxPredictions; i++) {
        var zoneindex = prediction[i].probability.toFixed(2) * (resultindex / 100)
        var zoneindex = zoneindex * 100
        var zoneindex = Math.round(zoneindex * 10) / 10

        if (zoneindex < 2.5) {
            var zonecolor = "gray";
        } else if (zoneindex < 25) {
            var zonecolor = "green";
        } else {
            var zonecolor = "red";
        }
        const classPrediction =
            `
            <div class="w-3/12"><span class="tiredindex-class">${prediction[i].name}</span></div>
            <div class="w-9/12 rounded rounded-xl ${zonecolor}" style="height: 2.4vh;">
                <div id="${prediction[i].className}" name="${zoneindex}"
                    class="px24vh rounded rounded-xl flex flex-row items-center justify-center ${zonecolor}bar"
                    style="width: 0%; height: 2.4vh;">
                    <span class="tiredindex-class text-white">${zoneindex}%</span>
                </div>
            </div>
        `
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }


}
function writeResult1(resultindex) {
    if (resultindex < 35) {
        $("#different-image").attr('src', `img/broccoli.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-green onelinemessage">브로콜리처럼 부드러워 보이는구만!</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-green">${resultindex}%</span> 피곤한
        상태야. </span><span class="onelinedescription">아주 건강해보여! 브로콜리같아요~</span></div></div>`
    } else if (resultindex < 50) {
        $("#different-image").attr('src', `img/fish.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-blue onelinemessage">자네는 아직 멀쩡해보이는구만, </span><span class="oneline-blue onelinemessage">하지만..약간 동태눈깔이 보여! 조심혀!!</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-blue">${resultindex}%</span> 피곤한
        상태야.</span><span class="onelinedescription">이 정돈 괜찮어~ 조금 더 일해도 돼~!</span></div></div>`
    } else if (resultindex < 75) {
        $("#different-image").attr('src', `img/pandamoving.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-puple onelinemessage">자네 다크서클이...판다랑 다를 게 없어..</span><span class="oneline-puple onelinemessage">좀 쉬는게 어떤가..?</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-puple">${resultindex}%</span> 피곤한
        상태야..</span><span class="onelinedescription">아직 버틸만 하지만, 썩 좋아보이진 않아.</span></div></div>`
    } else if (resultindex < 100) {
        $("#different-image").attr('src', `img/panda.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-red onelinemessage ">자네 눈 좀 보게!! 눈이 판다야 판다.</span><span class="oneline-red onelinemessage ">오늘 저녁은 대나무인가? </span>
        <div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네
                지금 무려 <span class="oneline-red">${resultindex}%</span>나 피곤한
                상태야!! </span><span class="onelinedescription">어서 집에가서 쉬라고</span></div></div>`
    } else {
        $("#different-image").attr('src', `img/ghost.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-gray onelinemessage">10분 정도 남았다네...영정사진이라도 준비혀..</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네
        지금 무려 <span class="oneline-red">%</span>나 피곤한
        상태야....</span><span class="onelinedescription">그니깐...아마 오래는 힘들거야...</span></div></div>`
    }
    $(".onelineestimate").html(totalmessage);
}

function writeResult2(resultindex) {
    if (resultindex < 35) {
        $("#different-image").attr('src', `img/cucumbers.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-green onelinemessage">갓 딴 오이처럼 싱싱해 보이는구만!</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-green">${resultindex}%</span> 피곤한
        상태야. </span><span class="onelinedescription">아주 건강해보여! 오이같아요~</span></div></div>`
    } else if (resultindex < 50) {
        $("#different-image").attr('src', `img/peach.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-pink onelinemessage">자네 아직 멀쩡해보이는구만, </span><span class="oneline-pink onelinemessage">잘 익은 복숭아 같어~~</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-pink">${resultindex}%</span> 피곤한
        상태야.</span><span class="onelinedescription"> 양-호. 좀 더 일하도록~!</span></div></div>`
    } else if (resultindex < 75) {
        $("#different-image").attr('src', `img/pistol.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-puple onelinemessage">자네 얼굴에 기름 뜬 것 좀 보게나. </span><span class="oneline-puple onelinemessage">기름 걱정은 안해도 되겠어~</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-puple">${resultindex}%</span> 피곤한
        상태야..</span><span class="onelinedescription">아직 버틸만 하지만, 썩 좋아보이진 않아.</span></div></div>`
    } else if (resultindex < 100) {
        $("#different-image").attr('src', `img/leaf.gif`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-red onelinemessage ">자네 피부가 꼭 축처진 시래기같다네!!</span>
        <div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네
                지금 무려 <span class="oneline-red">${resultindex}%</span>나 피곤한
                상태야!! </span><span class="onelinedescription">어서 집에가서 쉬라고</span></div></div>`
    } else {
        $("#different-image").attr('src', `img/ghost.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-gray onelinemessage">10분 정도 남았다네...영정사진이라도 준비혀..</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네
        지금 무려 <span class="oneline-red">${resultindex}%</span>나 피곤한
        상태야....</span><span class="onelinedescription">그니깐...아마 오래는 힘들거야...나까지 지쳐가는구만..</span></div></div>`
    }

    $(".onelineestimate").html(totalmessage);
}

function writeResult3(resultindex) {
    if (resultindex < 35) {
        $("#different-image").attr('src', `img/squash.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-green onelinemessage">갓 딴 애호박처럼 탱탱해 보이는구만!</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-green">${resultindex}%</span> 피곤한
        상태야. </span><span class="onelinedescription">아주 건강해보여! 애호박같아요~</span></div></div>`
    } else if (resultindex < 50) {
        $("#different-image").attr('src', `img/fig.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-pink onelinemessage">자네 아직 멀쩡해보이는구만, </span><span class="oneline-pink onelinemessage">잘 익은 무화과 같아! 기미 잡티는 조심해야겠는걸~</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-pink">${resultindex}%</span> 피곤한
        상태야.</span><span class="onelinedescription"> 양-호. 좀 더 일하도록~!</span></div></div>`
    } else if (resultindex < 75) {
        $("#different-image").attr('src', `img/berry.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-puple onelinemessage">피로가 얼굴까지 올라와서, 얼굴이 울굴불긋하구만..</span><span class="oneline-puple onelinemessage">상한 딸기같아..좀 쉬는게 어떤가....</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-puple">${resultindex}%</span> 피곤한
        상태야..</span><span class="onelinedescription">아직 버틸만 하지만, 썩 좋아보이진 않아.</span></div></div>`
    } else if (resultindex < 100) {
        $("#different-image").attr('src', `img/pumpkin.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-red onelinemessage ">자네 지금 늙은 호박이야!</span><span class="oneline-red onelinemessage "> 얼굴이 누래!! 어서 쉬게나!</span>
        <div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네
                지금 무려 <span class="oneline-red">${resultindex}%</span>나 피곤한
                상태야!! </span><span class="onelinedescription">어서 집에가서 쉬라고</span></div></div>`
    } else {
        $("#different-image").attr('src', `img/ghost.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-gray onelinemessage">10분 정도 남았다네...영정사진이라도 준비혀..</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네
        지금 무려 <span class="oneline-red">${resultindex}%</span>나 피곤한
        상태야....</span><span class="onelinedescription">그니깐...아마 오래는 힘들거야...나까지 지쳐가는구만..</span></div></div>`
    }

    $(".onelineestimate").html(totalmessage);
}

function writeResult4(resultindex) {
    if (resultindex < 35) {
        $("#different-image").attr('src', `img/paprika.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-green onelinemessage">잘 익은 파프리카처럼 예뻐 보이는구만!</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-green">${resultindex}%</span> 피곤한
        상태야. </span><span class="onelinedescription">아주 건강해보여! 파프리카 같아요~</span></div></div>`
    } else if (resultindex < 50) {
        $("#different-image").attr('src', `img/luna.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-blue onelinemessage">자네 아직 멀쩡해보이는구만, </span><span class="oneline-blue onelinemessage">그런데..자네 약간 보름달을 닮았어?</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-blue">${resultindex}%</span> 피곤한
        상태야.</span><span class="onelinedescription"> 양-호. 좀 더 일하도록~!</span></div></div>`
    } else if (resultindex < 75) {
        $("#different-image").attr('src', `img/noodle.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-puple onelinemessage">혹시 어제 라면 먹고 잤나? 얼굴이 많이 부었구만...</span><span class="oneline-puple onelinemessage">좀 쉬는게 어떤가....</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네는
        지금 <span class="oneline-puple">${resultindex}%</span> 피곤한
        상태야..</span><span class="onelinedescription">아직 버틸만 하지만, 썩 좋아보이진 않아.</span></div></div>`
    } else if (resultindex < 100) {
        $("#different-image").attr('src', `img/bakery.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-red onelinemessage ">호빵맨이 질투할만큼, 얼굴이 부었구만!</span>
        <div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네
                지금 무려 <span class="oneline-red">${resultindex}%</span>나 피곤한
                상태야!! </span><span class="onelinedescription">어서 집에가서 쉬라고</span></div></div>`
    } else {
        $("#different-image").attr('src', `img/ghost.png`);
        var totalmessage = `<div class="flex flex-col justify-center items-center" style="width: 40vh;"><span class="oneline-gray onelinemessage">10분 정도 남았다네...영정사진이라도 준비혀..</span><div class="mt-3 flex flex-col justify-center items-center "><span class="onelinedescription">자네
        지금 무려 <span class="oneline-red">${resultindex}%</span>나 피곤한
        상태야....</span><span class="onelinedescription">그니깐...아마 오래는 힘들거야...나까지 지쳐가는구만..</span></div></div>`
    }

    $(".onelineestimate").html(totalmessage);
}

function toggleimage() {
    $("#face-image").toggle()
    $("#different-image").toggle()
}

function showresult() {

    $("#clickimg").slideDown(500)
    $("#firstdiv").slideUp(300)
    $("#checkresult").slideUp(500)
    $("#test-result").slideDown(500)
    $("#face-image").slideUp(500)
    $("#different-image").slideDown(500)
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

function showsubtitle() {
    $("#subtitle").slideDown(450);
    $("#opensubtitle").hide();
    $(".line").hide();
    $("#closesubtitle").show();
    $("header").addClass("bg-gray-800")
    $(".headtitle").addClass("text-gray-200")
}


function hidesubtitle() {
    $("#subtitle").slideUp(340);
    $(".line").show();
    $("#opensubtitle").show();
    $("#closesubtitle").hide();
    $("header").removeClass("bg-gray-800")
    $(".headtitle").removeClass("text-gray-200")
}