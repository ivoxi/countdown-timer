import { state } from "./state.js";

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

        input.addEventListener("blur", () => {
            input.hidden = true;
            span.hidden = false;

            const h = Number(document.querySelector(".hours").textContent);
            const m = Number(document.querySelector(".minutes").textContent);
            const s = Number(document.querySelector(".seconds").textContent);

            let values = { hours: h, minutes: m, seconds: s };
            values[part] = Number(input.value) || 0;

            state.remainingMs = values.hours * 3_600_000 + values.minutes * 60_000 + values.seconds * 1_000;

            render();
        });
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
