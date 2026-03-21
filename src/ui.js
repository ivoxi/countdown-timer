import { state } from "./state.js";
import { timerStart, timerPause, timerStop } from "./timer.js";

const startButton = document.querySelector(".start-btn");
const pauseButton = document.querySelector(".pause-button");

function showInputForPart(part) {
    const span = document.querySelector(`.${part}`);
    const input = document.getElementById(`${part}-input`);

    if (!span || !input) return;

    input.value = span.textContent;

    span.hidden = true;
    input.hidden = false;
    input.focus();
    input.select();
}

function handleInputAction(part) {
    const span = document.querySelector(`.${part}`);
    const input = document.getElementById(`${part}-input`);
    input.hidden = true;
    span.hidden = false;

    const h = Number(document.querySelector(".hours").textContent);
    const m = Number(document.querySelector(".minutes").textContent);
    const s = Number(document.querySelector(".seconds").textContent);

    let values = { hours: h, minutes: m, seconds: s };
    values[part] = Number(input.value) || 0;

    state.remainingMs = values.hours * 3_600_000 + values.minutes * 60_000 + values.seconds * 1_000;

    render();
}

export function init() {
    const parts = ["hours", "minutes", "seconds"];

    parts.forEach((part) => {
        const span = document.querySelector(`.${part}`);
        const input = document.getElementById(`${part}-input`);
        if (!span || !input) return;

        span.addEventListener("click", () => {
            if (!state.isRunning && !state.isPause) {
                showInputForPart(part);
            }
        });


        let isArrowKey = false;

        input.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                isArrowKey = true;
            }

            if (e.key === "Tab") {
                e.preventDefault();
                handleInputAction(part);
                const nextPart = parts[parts.indexOf(part) + 1];
                if (nextPart) showInputForPart(nextPart);
            }
        });

        input.addEventListener("input", () => {
            const max = part === "hours" ? 99 : 59;
            if (input.value > max) input.value = max;
            if (input.value < 0) input.value = 0;

            if (!isArrowKey && input.value.length >= 2) {
                const nextPart = parts[parts.indexOf(part) + 1];
                if (nextPart) showInputForPart(nextPart);
            }

            isArrowKey = false;
        });

        input.addEventListener("blur", () => {
            handleInputAction(part);
        });

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleInputAction(part);
            }
        });

        startButton.addEventListener("click", () => {
            timerStart();
        })
    });
}



export function render() {
    const parts = ["hours", "minutes", "seconds"];

    parts.forEach((part) => {
        const span = document.querySelector(`.${part}`);
        if (!span) return;

        switch (part) {
            case "hours":
                span.textContent = String(Math.floor(state.remainingMs / 3_600_000)).padStart(2, "0");
                break;
            case "minutes":
                span.textContent = String(Math.floor((state.remainingMs % 3_600_000) / 60_000)).padStart(2, "0");
                break;
            case "seconds":
                span.textContent = String(Math.floor((state.remainingMs % 60_000) / 1000)).padStart(2, "0");
                break;
        }
    });
}
