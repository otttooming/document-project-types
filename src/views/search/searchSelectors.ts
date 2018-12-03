import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";
import { selectReflectionChildren } from "../../common/project/projectSelectors";

export const selectSearchQuery = (state: GlobalState) =>
  state.searchReducer.searchQuery;

export const selectFoundReflections = createSelector(
  selectSearchQuery,
  selectReflectionChildren,
  (query, reflectionChildren) => {
    if (!query || !reflectionChildren) {
      return null;
    }

    return reflectionChildren.reduce((acc, cur) => {
      if (
        cur.name.toLowerCase().includes(query.name.toLowerCase()) &&
        query.name.length !== 0
      ) {
        return [...acc, cur.id];
      }

      return acc;
    }, []);
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
