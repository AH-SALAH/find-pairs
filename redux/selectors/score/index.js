import { createSelector } from "reselect";

const selectScore = state => state.score;

export const selectScoreValue = () => createSelector(
    [selectScore],
    score => score.scoreValue
);