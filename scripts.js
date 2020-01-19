function decreaseTime(para) {
    let time = document.querySelector(para);
    if (Number(time.innerText) === 1)
        return;
    time.innerText = Number(time.innerText) - 1;
    setSession(false);
}

function increaseTime(para) {
    let time = document.querySelector(para);
    time.innerText = Number(time.innerText) + 1;
    setSession(true);
}

function setSession(flag, countDown) {
    let strTime = document.querySelector('#timeCountDown');
    let intTime = toIntTime(strTime.innerText);
    if (intTime === 0) {
        clearInterval(countDown);
        return;
    }
    flag ? ++intTime : --intTime;
    strTime.innerText = toStrTime(intTime);
}

function toIntTime(strTime) {
    let intTime;
    if (strTime.length > 5) {
        intTime = Number(strTime.substring(0, 2)) * 60 * 60 + 
                Number(strTime.substring(3, 5)) * 60 + 
                Number(strTime.substring(6));
    }
    else if (strTime.length === 4)
        intTime = Number(strTime.substring(0, 1)) * 60 + 
                Number(strTime.substring(2));
    else
        intTime = Number(strTime.substring(0, 2)) * 60 + 
        Number(strTime.substring(3));
    return intTime;
}

function toStrTime(intTime) {
    if (intTime >= 3600) {
        let hour = Math.trunc(intTime/3600);
        let minute = Math.trunc((intTime - hour * 3600)/60);
        let second = (intTime - hour * 3600)%60;
        return ((hour < 10) ? '0' + hour : hour) + ':' + 
                ((minute < 10) ? '0' + minute : minute) + 
                ':' + ((second < 10) ? '0' + second : second);
    }
    else {
        let minute = Math.trunc(intTime/60);
        let second = intTime%60;
        return ((minute < 10) ? '0' + minute : minute) 
        + ':' + ((second < 10) ? '0' + second : second);
    }
}

function count() {
    let  countdown = setInterval(function() {
        setSession(false, countdown);
    }, 1000);
}
