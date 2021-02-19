import { handleActions } from "redux-actions";
import { CHANGE_SIZE, CHANGE_SIZE_FAILED } from "../../actionTypes/size";

export const sizeReducer = handleActions({
    [CHANGE_SIZE]: (state, { payload }) => (
        { ...state, sizeValue: payload }
    ),
    [CHANGE_SIZE_FAILED]: (state, { payload }) => (
        { ...state, sizeError: payload ? payload : state.sizeError }
    ),
}, { sizeValue: 8, sizeError: 'Error' });