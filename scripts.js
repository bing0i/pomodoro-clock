function decreaseTime(para, bool) {
    let time = document.querySelector(para);
    if (Number(time.innerText) === 1)
        return;
    time.innerText = Number(time.innerText) - 1;
    if (bool)
        setSession(false, true);
}

function increaseTime(para, bool) {
    let time = document.querySelector(para);
    time.innerText = Number(time.innerText) + 1;
    if (bool)
        setSession(true, true);
}

function setSession(flag, flagHour, countDown) {
    let strTime = document.querySelector('#timeCountDown');
    let intTime = toIntTime(strTime.innerText);
    if (intTime === 0) {
        clearInterval(countDown); 
        return;
    }
    if (flagHour && flag) {
        intTime += 60;
    }
    else if (flagHour && !flag) {
        intTime -= 60;
    }
    else if (!flagHour && flag) 
        ++intTime;
    else
        --intTime;
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

function play() {
    disableButtons(true);
    let  countdown = setInterval(function() {
        document.querySelector('#pauseBtn').disabled = false;

        document.querySelector('#pauseBtn').onclick = function() {
            clearInterval(countdown);
            document.querySelector('#playBtn').disabled = false;
            document.querySelector('#pauseBtn').disabled = true;
        };

        document.querySelector('#stopBtn').onclick = function() {
            clearInterval(countdown);
            let time = document.querySelector('#timeCountDown');
            let selectedTime = document.querySelector('#sessionTimeText');
            time.innerText = selectedTime.innerText + ':00';
            disableButtons(false);
        }

        document.querySelector('#replayBtn').onclick = function() {
            clearInterval(countdown);
            disableButtons(false);
            setTime();
        }

        setSession(false, false, countdown);
    }, 1000);
}

function disableButtons(bool) {
    document.querySelector('#downLeftBtn').disabled = bool;
    document.querySelector('#downRightBtn').disabled = bool;
    document.querySelector('#upLeftBtn').disabled = bool;
    document.querySelector('#upRightBtn').disabled = bool;
    document.querySelector('#playBtn').disabled = bool;
}

function setTime() {
    let time = document.querySelector('#timeCountDown');
    let selectedSessionTime = document.querySelector('#sessionTimeText');
    let selectedBreakTime = document.querySelector('#breakTimeText');
    let text = document.querySelector('#showSessionOrBreak');
    selectedSessionTime.innerText = '25';
    selectedBreakTime.innerText = '5';
    time.innerText = selectedSessionTime.innerText + ':00';
    text.innerText = 'Session';
}

function setBreak() {
    let text = document.querySelector('#showSessionOrBreak')
    let time = document.querySelector('#timeCountDown');
    let selectedBreakTime = document.querySelector('#breakTimeText');
    text.innerText = 'Break';
    time.innerText = selectedBreakTime.innerText + ':00';
    play();
}

setTime();