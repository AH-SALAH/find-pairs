import { put, takeEvery } from "redux-saga/effects";
import { changeSize, changeSizeFailed } from "../../actions/size";

// ===========================
// actions
// ===========================

function* changeSizeActionHandler(data) {
    try {
        yield put(changeSize, data); 
    } catch (error) {
        yield put(changeSizeFailed, error.message);
    }
}

// ============================
// watchers
// ============================
export function* changeSizeSaga() {
    yield takeEvery(changeSizeActionHandler, changeSize);
}