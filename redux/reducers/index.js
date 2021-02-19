import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { RESET_STORE } from "../actionTypes/reset";
import { scoreReducer } from "./score";
import { triesReducer } from "./tries";
import { restartReducer } from "./restart";
import { sizeReducer } from "./size";

const appReducer = combineReducers({
    score: scoreReducer,
    tries: triesReducer,
    restart: restartReducer,
    size: sizeReducer,
});

export const rootReducer = (state = {}, action) => {

    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        return state.score.scoreValue || action.payload.restart !== state.restart ? state : nextState;
    }

    if (action.type === RESET_STORE) {
        state = action.payload || {};
    }

    return appReducer(state, action);
};

export default rootReducer;