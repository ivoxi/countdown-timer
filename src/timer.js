import { state } from "./state";

export function setDuration(durationMs) {
    state.durationMs = durationMs;
    state.remainingMs = durationMs;
}

export function tick() {
    if (!state.targetTime) return;

    const remaining = state.targetTime - Date.now();
    if (remaining <= 0) {
        state.remainingMs = 0;
        timerStop();
    } else {
        state.remainingMs = remaining;
    }
}

export function timerStart() {
    if (state.isRunning || !state.remainingMs || state.remainingMs <= 0) {
        return;
    }
    state.targetTime = Date.now() + state.remainingMs;
    state.intervalId = setInterval(tick, 50);
    state.isRunning = true;
}

export function timerPause() {
    if (!state.isRunning) return;
    clearInterval(state.intervalId);
    state.intervalId = null;
    state.isRunning = false;
}

export function timerStop() {
    if (!state.isRunning) return;
    clearInterval(state.intervalId);
    state.intervalId = null;
    state.isRunning = false;
    state.remainingMs = 0;
}