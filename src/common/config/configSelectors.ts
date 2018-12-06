import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";

export const getGitHubConfig = (state: GlobalState) =>
  state.configReducer.gitHub;
