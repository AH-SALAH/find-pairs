import { createSelector } from "reselect";

const selectSize = state => state.size;

export const selectSizeValue = () => createSelector(
    [selectSize],
    size => size.sizeValue
);