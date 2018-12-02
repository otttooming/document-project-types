import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";

export const selectActiveView = (state: GlobalState) =>
  state.sidebarReducer.activeView;
