import { put, takeEvery } from "redux-saga/effects";
import { restart } from "../../actions/restart";

// ===========================
// actions
// ===========================

function* restartActionHandler(data) {
    yield put(restart, data);
}

// ============================
// watchers
// ============================
export function* restartSaga() {
    yield takeEvery(restartActionHandler, restart);
}