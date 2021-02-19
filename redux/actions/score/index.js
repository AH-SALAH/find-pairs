import { ADD_SCORE, FAILED_SCORE } from "../../actionTypes/score";
import { createActions } from "redux-actions";

// export const addScoreAction = payload => {
//     return {
//         type: ADD_SCORE,
//         payload
//     }
// };

// export const failedScoreAction = payload => {
//     return {
//         type: FAILED_SCORE,
//         payload
//     }
// };

export const { addScore, failedScore } = createActions(ADD_SCORE, FAILED_SCORE);