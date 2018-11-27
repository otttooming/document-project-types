import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";

export const getActiveComponentName = (state: GlobalState) =>
  state.dashboardReducer.activeComponentName;

export const selectActiveComponentName = createSelector(
  getActiveComponentName,
  activeComponent => {
    return activeComponent;
  }
);

export const getReflection = (state: GlobalState) =>
  state.dashboardReducer.reflection;

export const selectReflectionChildren = createSelector(
  getReflection,
  reflection => {
    if (!reflection) {
      return null;
    }

    return reflection.children;
  }
);

export const selectActiveComponent = createSelector(
  getActiveComponentName,
  getReflection,
  (activeComponentName, reflection) => {
    const foundActiveComponent = reflection!.children.find(
      item => item.name === activeComponentName
    );
    return foundActiveComponent;
  }
);

export const selectExtendedTypes = createSelector(
  selectActiveComponent,
  activeComponent => {
    if (!activeComponent || !activeComponent.extendedTypes) {
      return null;
    }
    return activeComponent.extendedTypes;
  }
);

export const selectTypeArgumentsIds = createSelector(
  selectExtendedTypes,
  extendedTypes => {
    if (!extendedTypes || !extendedTypes.length) {
      return null;
    }

    const ids: number[] = extendedTypes.reduce((acc, cur) => {
      if (cur.type !== "reference") {
        return acc;
      }

      if (cur.id) {
        return [...acc, cur.id];
      }

      if (Array.isArray(cur.typeArguments) && cur.typeArguments.length) {
        const typeArgumentIds: number[] = cur.typeArguments.reduce(
          (acc, cur) => {
            if (typeof cur.id === "undefined") {
              return acc;
            }

            return [...acc, cur.id];
          },
          []
        );

        return [...acc, ...typeArgumentIds];
      }

      return acc;
    }, []);

    const uniqueIds: number[] = [...new Set(ids)];

    return uniqueIds;
  }
);

export const selectInterfaceReflection = createSelector(
  selectTypeArgumentsIds,
  selectReflectionChildren,
  (ids, reflectionChildren) => {
    if (!Array.isArray(ids) || !ids.length || !reflectionChildren) {
      return null;
    }

    return reflectionChildren.reduce((acc, cur) => {
      if (ids.includes(cur.id)) {
        return [...acc, cur];
      }

      return acc;
    }, []);
  }
);
