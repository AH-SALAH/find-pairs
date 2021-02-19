import { put, takeEvery } from "redux-saga/effects";
import { addTries, failedTries } from "../../actions/tries";

// ===========================
// actions
// ===========================

function* addTriesActionHandler(data) {
    try {
        yield put(addTries, data); 
    } catch (error) {
        yield put(failedTries, error.message);
    }
}

// ============================
// watchers
// ============================
export function* triesSaga() {
    yield takeEvery(addTriesActionHandler, addTries);
}