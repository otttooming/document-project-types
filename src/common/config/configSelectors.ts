import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";
import {
  selectActiveComponent,
  selectActiveComponentName,
} from "../project/projectSelectors";
import { getGitHubURL } from "./configHelpers";

export const getGitHubConfig = (state: GlobalState) =>
  state.configReducer.gitHub;

export const selectGitHubUrl = createSelector(
  getGitHubConfig,
  selectActiveComponent,
  selectActiveComponentName,
  (gitHubConfig, activeComponent, activeComponentName) => {
    if (!activeComponent || !activeComponentName) {
      return null;
    }

    const { sources } = activeComponent;

    const act = sources.find(({ fileName }) =>
      fileName.includes(activeComponentName)
    );

    if (!act) {
      return null;
    }

    const { fileName } = act;

    return getGitHubURL(fileName, gitHubConfig);
  }
);
