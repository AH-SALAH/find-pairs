import { createActions } from "redux-actions";
import { ADD_TRIES, FAILED_TRIES } from "../../actionTypes/tries";

export const { addTries, failedTries } = createActions(ADD_TRIES, FAILED_TRIES);