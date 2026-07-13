const settingsButton =
    document.getElementById("settingsButton");

const settingsPanel =
    document.getElementById("settingsPanel");

const startButton =
    document.getElementById("startButton");

const resetButton =
    document.getElementById("resetButton");

const startTimeInput =
    document.getElementById("startTime");

const speedSelect =
    document.getElementById("speed");

const clock =
    document.getElementById("clock");

let running = false;

let virtualSeconds = 4 * 3600;

let lastHour =
    Math.floor(
        virtualSeconds / 3600
    );



// 設定パネル開閉
settingsButton.onclick = function () {

    settingsPanel.classList.toggle("open");

};



// 時計表示更新
function updateDisplay() {

    const hours =
        Math.floor(virtualSeconds / 3600) % 24;

    const minutes =
        Math.floor(virtualSeconds / 60) % 60;

    const seconds =
        virtualSeconds % 60;

    clock.textContent =

        String(hours).padStart(2, "0")
        + ":"
        + String(minutes).padStart(2, "0")
        + ":"
        + String(seconds).padStart(2, "0");

}



// 開始・停止切り替え
startButton.onclick = function () {

    running = !running;

    if (running) {

        startButton.textContent = "停止";

        startButton.classList.add("active-start");

    }

    else {

        startButton.textContent = "開始";

        startButton.classList.remove("active-start");

    }

};



// リセット
resetButton.onclick = function () {

    const time =
        startTimeInput.value;

    const parts =
        time.split(":");

    const hours =
        Number(parts[0]);

    const minutes =
        Number(parts[1]);

    virtualSeconds =
        hours * 3600 +
        minutes * 60;

    updateDisplay();

};



// 時計更新
setInterval(function () {

    if (!running) {

        return;

    }

   virtualSeconds +=
    Number(speedSelect.value);

const currentHour =
    Math.floor(
        virtualSeconds / 3600
    ) % 24;

if (currentHour !== lastHour) {

    const speech =
        new SpeechSynthesisUtterance(
            currentHour + "時です"
        );

    speech.lang = "ja-JP";

    speechSynthesis.speak(
        speech
    );

    lastHour = currentHour;

}

updateDisplay();

 lastHour =
    Math.floor(
        virtualSeconds / 3600
    );

}, 1000);



// 初期表示
updateDisplay();

startButton.textContent = "開始";
