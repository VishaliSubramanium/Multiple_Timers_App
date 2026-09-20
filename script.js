let timers = [];

let timerList = document.getElementById("timerList");

function startTimer() {

    let hours = Number(document.getElementById("hours").value);
    let minutes = Number(document.getElementById("minutes").value);
    let seconds = Number(document.getElementById("seconds").value);

    let totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;

    if (totalSeconds <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    let timer = {
        time: totalSeconds,
        finished: false
    };

    timers.push(timer);
    displayTimers();

    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";

    countdown(timer);
}

function countdown(timer) {

    let interval = setInterval(function() {

        timer.time--;

        if (timer.time <= 0) {
            timer.time = 0;
            timer.finished = true;
            clearInterval(interval);
            playSound();
        }

        displayTimers();
    }, 1000);
}

function displayTimers() {

    timerList.innerHTML = "";

    if (timers.length === 0) {
        timerList.innerHTML =
            "<p id='noTimer'>You have no timers currently!</p>";
        return;
    }

    timers.forEach(function(timer, index) {

        let timerBox = document.createElement("div");
        timerBox.classList.add("timer");

        if (timer.finished) {
            timerBox.classList.add("finished");
            timerBox.innerHTML = `
                <span class="message">
                    Timer Is Up!
                </span>
                <button onclick="deleteTimer(${index})">
                    Stop
                </button>
            `;
        }
        else {
            timerBox.innerHTML = `
                <span>Time Left :</span>
                <span class="time">
                    ${formatTime(timer.time)}
                </span>
                <button onclick="deleteTimer(${index})">
                    Delete
                </button>
            `;
        }

        timerList.appendChild(timerBox);
    });
}

function formatTime(seconds) {

    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    secs = String(secs).padStart(2, "0");

    return hours + " : " + minutes + " : " + secs;
}

function deleteTimer(index) {

    timers.splice(index, 1);
    displayTimers();

}

function playSound() {
    
    let audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");

    audio.play();
}