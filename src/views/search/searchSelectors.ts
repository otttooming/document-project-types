import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";

export const selectSearchQuery = (state: GlobalState) =>
  state.searchReducer.searchQuery;
