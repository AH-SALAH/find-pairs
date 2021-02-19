import { ADD_SCORE, FAILED_SCORE } from "../../actionTypes/score";
import { handleActions } from "redux-actions";

// export const scoreReducer = (state = { scoreValue: 0, scoreError: 'Error' }, action) => {
//     switch (action.type) {
//         case ADD_SCORE:
//             return { ...state, scoreValue: action.payload ? state.scoreValue + action.payload : action.payload };

//         case FAILED_SCORE:
//             return { ...state, scoreError: action.payload ? action.payload : state.scoreError };

//         default:
//             return state;
//     }
// };

export const scoreReducer = handleActions({
    [ADD_SCORE]: (state, action) => (
        { ...state, scoreValue: action.payload ? state.scoreValue + action.payload : action.payload }
    ),
    [FAILED_SCORE]: (state, action) => (
        { ...state, scoreError: action.payload ? action.payload : state.scoreError }
    ),
}, { scoreValue: 0, scoreError: 'Error' });