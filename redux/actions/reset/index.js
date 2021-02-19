import { createAction } from "redux-actions";
import { RESET_STORE } from "../../actionTypes/reset";

export const resetStore = createAction(RESET_STORE);