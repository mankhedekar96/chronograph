let secondsHand = document.getElementById("secondsHand");
let minutesHand = document.getElementById("minutesHand");
let hoursHand = document.getElementById("hoursHand");
let stopwatchSecondsHand = document.getElementById("stopwatchSecondsHand");
let stopwatchMinutesHand = document.getElementById("stopwatchMinutesHand");
let stopwatchHoursHand = document.getElementById("stopwatchHoursHand");
let dial = document.getElementById("dial");
let stopwatchSeconds = document.getElementById("stopwatchSeconds");
let stopwatchMinutes = document.getElementById("stopwatchMinutes");
let stopwatchHours = document.getElementById("stopwatchHours");

let startKey = document.getElementById("startKey");
let resetKey = document.getElementById("resetKey");
let stopwatchCounter = document.getElementById("stopwatchCounter");

let stopwatchTime = {};

function draw() {
    // Drawing dial
    for (let i = 0; i <= 60; i++) {
        let dialMark = document.createElement("div");
        dialMark.classList.add("dial-mark");
        dialMark.style.transform =
            "rotate(" + 6 * i + "deg) translate(-50%, calc(2vh))";
        dialMark.style.zIndex = "0";

        if (i % 5 === 0) {
            dialMark.style.borderWidth = "1.5px";
        }
        dial.appendChild(dialMark);

        // Drawing stopwatch
        let stopwatchMark = document.createElement("div");
        stopwatchMark.classList.add("stopwatch-mark");
        stopwatchMark.style.textAlign = "center";
        stopwatchMark.style.transform =
            "rotate(" + 6 * i + "deg) translate(-50%, calc(3.5vh))";

        let stopwatchMark1 = stopwatchMark.cloneNode(true);
        if (i % 5 === 0) {
            stopwatchMark.style.borderWidth = "1px";

            let stopwatchMark2 = document.createElement("div");
            stopwatchMark2.classList.add("stopwatch-mark");
            stopwatchMark2.style.textAlign = "center";
            stopwatchMark2.style.transform =
                "rotate(" + 30 * i + "deg) translate(-50%, calc(3.5vh))";
            stopwatchMark2.style.borderWidth = "1.5px";
            stopwatchHours.appendChild(stopwatchMark2);
        }

        stopwatchSeconds.appendChild(stopwatchMark1);
        stopwatchMinutes.appendChild(stopwatchMark);
    }
}

function startWatch() {
    setInterval(function() {
        let secondAngle = 6 * new Date().getSeconds();
        let minuteAngle =
            6 * new Date().getMinutes() + 0.1 * new Date().getSeconds(); //secondsMoved;
        let hourAngle =
            30 * (new Date().getHours() % 12) +
            0.5 * new Date().getMinutes() +
            0.0083 * new Date().getSeconds(); //secondsMoved and minutesMoved;

        secondsHand.style.transform =
            "rotate(" + secondAngle + "deg) translate(-50%, -90%)";
        minutesHand.style.transform =
            "rotate(" + minuteAngle + "deg) translate(-50%, -90%)";
        hoursHand.style.transform =
            "rotate(" + hourAngle + "deg) translate(-50%, -90%)";
    }, 1000);

    defaultStopwatch();
}

function startStopWatch() {
    alternateFunction(startKey, pauseStopWatch);

    window.stopwatchInterval = setInterval(function() {
        if (stopwatchTime.milliSeconds === 99) {
            stopwatchTime.milliSeconds = 0;

            if (stopwatchTime.seconds === 59) {
                stopwatchTime.seconds = 0;

                if (stopwatchTime.minutes === 59) {
                    stopwatchTime.minutes = 0;
                    stopwatchTime.hours++;
                } else {
                    stopwatchTime.minutes++;
                }
            } else {
                stopwatchTime.seconds++;
            }
        } else {
            stopwatchTime.milliSeconds++;
        }

        let stopwatchSecondAngle = 6 * stopwatchTime.seconds;
        let stopwatchMinuteAngle =
            6 * stopwatchTime.minutes + 0.1 * stopwatchTime.seconds;
        let stopwatchHourAngle =
            30 * (stopwatchTime.hours % 12) +
            0.5 * stopwatchTime.minutes +
            0.0083 * stopwatchTime.seconds;

        stopwatchSecondsHand.style.transform =
            "rotate(" + (stopwatchSecondAngle % 360) + "deg) translate(-50%, -90%)";
        stopwatchMinutesHand.style.transform =
            "rotate(" + (-120 + (stopwatchMinuteAngle % 360)) + "deg) translate(-50%, -90%)";
        stopwatchHoursHand.style.transform =
            "rotate(" + (-240 + (stopwatchHourAngle % 360)) + "deg) translate(-50%, -90%)";

        stopwatchCounter.innerText =
            ("0" + stopwatchTime.hours).slice(-2) +
            ":" +
            ("0" + stopwatchTime.minutes).slice(-2) +
            ":" +
            ("0" + stopwatchTime.seconds).slice(-2) +
            ":" +
            ("0" + stopwatchTime.milliSeconds).slice(-2);
    }, 10);
}

function pauseStopWatch() {
    alternateFunction(startKey, startStopWatch);
    clearInterval(window.stopwatchInterval);
}

function alternateFunction(element, eventListener) {
    element.onclick = eventListener;
}

function defaultStopwatch() {
    stopwatchTime = {
        milliSeconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0
    };

    stopwatchSecondsHand.style.transform = "rotate(0deg) translate(-50%, -90%)";
    stopwatchMinutesHand.style.transform =
        "rotate(-120deg) translate(-50%, -90%)";
    stopwatchHoursHand.style.transform = "rotate(-240deg) translate(-50%, -90%)";

    stopwatchCounter.innerText =
        ("0" + stopwatchTime.hours).slice(-2) +
        ":" +
        ("0" + stopwatchTime.minutes).slice(-2) +
        ":" +
        ("0" + stopwatchTime.seconds).slice(-2) +
        ":" +
        ("0" + stopwatchTime.milliSeconds).slice(-2);
}

function resetStopWatch() {
    pauseStopWatch();

    stopwatchSecondsHand.style.transition = stopwatchMinutesHand.style.transition = stopwatchHoursHand.style.transition =
        "all 1s linear";

    defaultStopwatch();

    setTimeout(function() {
        stopwatchSecondsHand.style.transition = stopwatchMinutesHand.style.transition = stopwatchHoursHand.style.transition =
            "none";
    }, 1000);
}

window.onload = function() {
    draw();
    startWatch();
    alternateFunction(startKey, startStopWatch);
};