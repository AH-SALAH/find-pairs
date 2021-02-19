import { createActions } from "redux-actions";
import { CHANGE_SIZE, CHANGE_SIZE_FAILED } from "../../actionTypes/size";

export const { changeSize, changeSizeFailed } = createActions(CHANGE_SIZE, CHANGE_SIZE_FAILED);