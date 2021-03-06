import { GlobalState } from "../../reducers";
import { createSelector } from "reselect";

export const getActiveComponentName = (state: GlobalState) =>
  state.projectReducer.activeComponentName;

export const selectActiveComponentName = createSelector(
  getActiveComponentName,
  activeComponent => {
    return activeComponent;
  }
);

export const getReflection = (state: GlobalState) =>
  state.projectReducer.reflection;

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
    if (!reflection) {
      return null;
    }

    const foundActiveComponent = reflection.children.find(
      item => item.name === activeComponentName
    );

    if (!foundActiveComponent) {
      return null;
    }

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

/**
 * "kindString": "Function",
 */
export const selectFunctionSignatures = createSelector(
  selectActiveComponent,
  activeComponent => {
    if (!activeComponent || !activeComponent.signatures) {
      return null;
    }
    return activeComponent.signatures;
  }
);

export const selectFunctionParametersIds = createSelector(
  selectFunctionSignatures,
  signatures => {
    if (!Array.isArray(signatures)) {
      return null;
    }

    return signatures.reduce((acc, { parameters = [] }) => {
      const parametersIds = parameters.reduce(
        (paraAcc, { type: { types = [] } }) => {
          const typesIds = types.reduce((ac, cu) => {
            if (cu.id) {
              return [...ac, cu.id];
            }

            return ac;
          }, []);

          if (!!typesIds.length) {
            return [...paraAcc, ...typesIds];
          }

          return paraAcc;
        },
        []
      );

      if (!!parametersIds.length) {
        return [...acc, ...parametersIds];
      }

      return acc;
    }, []);
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

/**
 * If we are selecting Interface for introspection we get it's ID.
 */
export const selectKindStringAsInterfaceId = createSelector(
  selectActiveComponent,
  activeComponent => {
    if (!activeComponent || activeComponent.kindString !== "Interface") {
      return null;
    }

    return activeComponent.id;
  }
);

export const selectInterfaceIds = createSelector(
  selectFunctionParametersIds,
  selectTypeArgumentsIds,
  selectKindStringAsInterfaceId,
  (...args) => {
    const ids: number[] = args.reduce<number[]>((acc, cur) => {
      if (Array.isArray(cur)) {
        return [...acc, ...cur];
      }

      if (typeof cur === "number") {
        return [...acc, cur];
      }

      return acc;
    }, []);

    if (!ids.length) {
      return null;
    }

    return ids;
  }
);

export const selectInterfaceReflection = createSelector(
  selectInterfaceIds,
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

/**
 * Find React Component State ID
 */
export const selectStateId = createSelector(
  selectActiveComponent,
  comp => {
    if (!comp || !Array.isArray(comp.children)) {
      return null;
    }

    const child = comp.children.find(item => item.name === "state");

    /**
     * Naïve implementation for getting the React Component State ID. Futher research needed if more applicable case available.
     */
    const id = !child ? null : child.type!.typeArguments![0].id!;

    return id;
  }
);

/**
 * Find React Component Props ID
 */
export const selectPropsId = createSelector(
  selectActiveComponent,
  comp => {
    if (!comp || !Array.isArray(comp.children)) {
      return null;
    }

    const child = comp.children.find(item => item.name === "props");

    /**
     * Naïve implementation for getting the React Component Props ID. Futher research needed if more applicable case available.
     */
    const id = !child ? null : child.type!.types![1].typeArguments![0].id!;

    return id;
  }
);

/**
 * Find React Component defaultProps ID
 */
export const selectDefaultPropsId = createSelector(
  selectActiveComponent,
  comp => {
    if (!comp || !Array.isArray(comp.children)) {
      return null;
    }

    const child = comp.children.find(item => item.name === "defaultProps");

    const id: number | null = !child ? null : child.id;

    return id;
  }
);

/**
 * Find React Component defaultProps reflection
 */
export const selectDefaultProps = createSelector(
  selectActiveComponent,
  selectDefaultPropsId,
  (comp, id) => {
    if (!comp || !Array.isArray(comp.children) || !id) {
      return null;
    }

    const reflection = comp.children.find(item => item.id === id);

    return !reflection ? null : reflection;
  }
);

/**
 * Find React Component defaultProps reflection children
 */
export const selectDefaultPropsChildren = createSelector(
  selectDefaultProps,
  defaultProps => {
    if (!defaultProps) {
      return null;
    }

    const children = defaultProps.children;

    return !Array.isArray(children) ? null : children;
  }
);
