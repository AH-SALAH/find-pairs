import { handleAction } from "redux-actions";
import { RESTART } from "../../actionTypes/restart";

export const restartReducer = handleAction(
    RESTART,
    (state, { payload }) => !!payload,
    true
);