import { call, put, takeEvery } from "redux-saga/effects";
import { addScore, failedScore } from "../../actions/score";

// ===========================
// actions
// ===========================

function* addScoreActionHandler(data) {
    try {
        yield put(addScore, data); 
    } catch (error) {
        yield put(failedScore, error.message);
    }
}

// ============================
// watchers
// ============================
export function* scoreSaga() {
    yield takeEvery(addScoreActionHandler, addScore);
}