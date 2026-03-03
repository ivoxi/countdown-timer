import { state } from "./state";

export function setDuration(durationMs) {
    state.durationMs = durationMs;
    state.remainingMs = durationMs;
    state.targetTime = null;
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
    if (state.isRunning || state.remainingMs <= 0) {
        return;
    }

    state.targetTime = Date.now() + state.remainingMs;
    state.intervalId = setInterval(tick, 200);
    state.isRunning = true;
}

export function timerPause() {
    if (!state.isRunning) return;

    state.remainingMs = Math.max(state.targetTime - Date.now(), 0);
    clearInterval(state.intervalId);
    state.intervalId = null;
    state.targetTime = null;
    state.isRunning = false;
}

export function timerStop() {
    if (state.intervalId) {
        clearInterval(state.intervalId);
    }

    state.intervalId = null;
    state.isRunning = false;
    state.targetTime = null;
    state.remainingMs = state.durationMs;
}
