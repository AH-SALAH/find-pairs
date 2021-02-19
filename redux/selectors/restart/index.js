import { createSelector } from "reselect";

const selectRestart = state => state.restart;

export const selectRestartValue = () => createSelector(
    [selectRestart],
    restart => restart
);