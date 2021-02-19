import { all } from 'redux-saga/effects';
import { scoreSaga } from './score';
import { triesSaga } from './tries';
import { restartSaga } from './restart';
import { changeSizeSaga } from './size';

function* rootSaga() {
    yield all([
        scoreSaga,
        triesSaga,
        restartSaga,
        changeSizeSaga
    ])
}

export default rootSaga;