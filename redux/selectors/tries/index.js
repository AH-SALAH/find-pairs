import { createSelector } from "reselect";

const selectTries = state => state.tries;

export const selectTriesValue = () => createSelector(
    [selectTries],
    tries => tries.triesValue
);