const settingsButton =
document.getElementById(
"settingsButton"
);

const settingsPanel =
document.getElementById(
"settingsPanel"
);

settingsButton.onclick =
function () {

```
settingsPanel.classList.toggle(
    "open"
);
```

};

let virtualSeconds =
4 * 3600;

let running = false;

function updateDisplay() {

```
const h =
    Math.floor(
        virtualSeconds / 3600
    ) % 24;

const m =
    Math.floor(
        virtualSeconds / 60
    ) % 60;

const s =
    virtualSeconds % 60;

document.getElementById(
    "clock"
).textContent =

    String(h).padStart(2, "0")
    + ":"
    + String(m).padStart(2, "0")
    + ":"
    + String(s).padStart(2, "0");
```

}

document.getElementById(
"startButton"
).onclick =
function () {

```
running = true;
```

};

document.getElementById(
"pauseButton"
).onclick =
function () {

```
running = false;
```

};

document.getElementById(
"resetButton"
).onclick =
function () {

```
const time =
    document.getElementById(
        "startTime"
    ).value;

const [h, m] =
    time.split(":")
    .map(Number);

virtualSeconds =
    h * 3600 +
    m * 60;

updateDisplay();
```

};

setInterval(
function () {

```
    if (!running) {

        return;

    }

    const speed =
        Number(
            document.getElementById(
                "speed"
            ).value
        );

    virtualSeconds += speed;

    updateDisplay();

},
1000
```

);

updateDisplay();
