function showInputForPart(part) {
    const span = document.querySelector(`.${part}`);
    const input = document.getElementById(`${part}-input`);

    if (!span || !input) return;

    span.hidden = true;
    input.hidden = false;
    input.focus();
    input.select();
}

export function initEditableTimeFields() {
    const parts = ["hours", "minutes", "seconds"];

    parts.forEach((part) => {
        const span = document.querySelector(`.${part}`);
        if (!span) return;

        span.addEventListener("click", () => {
            showInputForPart(part);
        });
    });
}
