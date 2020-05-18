const text = document.querySelector("h3");

function getNowTime() {
    const nowTime = new Date();
    const nowHours = nowTime.getHours();
    const nowMinutes = nowTime.getMinutes();
    const nowSeconds = nowTime.getSeconds();
    const nowMilseconds = nowTime.getMilliseconds();
    const nowTimeString = `${nowHours < 10 ? `0${nowHours}` : nowHours} : ${nowMinutes < 10 ? `0${nowMinutes}` : nowMinutes} : ${nowSeconds < 10 ? `0${nowSeconds}` : nowSeconds} : ${nowMilseconds < 100 ? `0${nowMilseconds}` : nowMilseconds}`;
    return nowTimeString;
    }
    
function writeTime(){
      nowTimeString = getNowTime();
      text.innerHTML = nowTimeString;
    }

function checkOnline() {
    var netBool = navigator.onLine;
    if (netBool) {
        const span = document.createElement("span");
        span.innerText = getNowTime();;
        console.dir(navigator.onLine)
    } else {
        console.log("now offline");
        const span = document.createElement("span");
        span.innerText = getNowTime();;
    };
}

function init() {
    setInterval(checkOnline, 1);
}

init();