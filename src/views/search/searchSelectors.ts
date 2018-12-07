import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";
import { selectReflectionChildren } from "../../common/project/projectSelectors";
import { filterKindString, filterName } from "./searchHelpers";

export const selectSearchQuery = (state: GlobalState) =>
  state.searchReducer.searchQuery;

export const selectFoundReflections = createSelector(
  selectSearchQuery,
  selectReflectionChildren,
  (query, reflectionChildren) => {
    if (!query || !reflectionChildren) {
      return null;
    }

    const { name, kindString } = query;

    return reflectionChildren
      .filter(filterName(name))
      .filter(filterKindString(kindString))
      .map(child => child.id);
  }
);

export const selectActiveReflectionList = createSelector(
  selectFoundReflections,
  selectReflectionChildren,
  (ids, reflectionChildren) => {
    if (!ids || !reflectionChildren) {
      return null;
    }

    return ids.reduce((acc, cur) => {
      const f = reflectionChildren.find(reflection => reflection.id === cur);
      if (!f) {
        return acc;
      }

      return [...acc, f];
    }, []);
  }
);
