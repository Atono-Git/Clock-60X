import { db } from "./firebase.js";

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

export const speedSelect =
    document.getElementById("speed");

const clock =
    document.getElementById("clock");

export let running = false;

export let virtualSeconds = 4 * 3600;

export let isClient = false;

export function setClientMode(value) {

    isClient = value;

}

let lastHour =
    Math.floor(
        virtualSeconds / 3600
    );

    let lastSync = 0;



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
export function setVirtualSeconds(value) {

    virtualSeconds = value;

    lastSync = Date.now();

    updateDisplay();

}

export function setRunning(value) {

    running = value;

}


// 時計更新
setInterval(function () {

    if (isClient) {

        return;

    }
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

const now = Date.now();

document.dispatchEvent(
    new CustomEvent(
        "clockTick",
        {
            detail: {

                running,

                virtualSeconds,

                speed:
                    Number(speedSelect.value),

                timestamp:
                    now

            }

        }

    )

);



}, 1000);



// 初期表示
updateDisplay();
 lastHour =
    Math.floor(
        virtualSeconds / 3600
    );
startButton.textContent = "開始";

export {
    updateDisplay
};
