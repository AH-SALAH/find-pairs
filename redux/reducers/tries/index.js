import { handleActions } from "redux-actions";
import { ADD_TRIES, FAILED_TRIES } from "../../actionTypes/tries";

export const triesReducer = handleActions({
    [ADD_TRIES]: (state, { payload }) => (
        { ...state, triesValue: payload ? state.triesValue + payload : payload }
    ),
    [FAILED_TRIES]: (state, { payload }) => (
        { ...state, triesError: payload ? payload : state.triesError }
    ),
}, { triesValue: 0, triesError: 'Error' });