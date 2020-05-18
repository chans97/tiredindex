const time = document.querySelector("h1");

function getNowTime() {
    const nowTime = new Date();
    const nowHours = nowTime.getHours();
    const nowMinutes = nowTime.getMinutes();
    const nowSeconds = nowTime.getSeconds();
    const nowTimeString = `${nowHours < 10 ? `0${nowHours}` : nowHours} : ${nowMinutes < 10 ? `0${nowMinutes}` : nowMinutes} : ${nowSeconds < 10 ? `0${nowSeconds}` : nowSeconds} `;
return nowTimeString;
}

function writeTime(){
  nowTimeString = getNowTime();
  time.innerHTML = nowTimeString;
}

function init(){
setInterval(writeTime, 1);
}

init();