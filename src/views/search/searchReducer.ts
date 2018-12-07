import { handleActions, Action } from "redux-actions";
import { findReflectionRequest } from "./searchActions";

export enum KindString {
  CLASS = "Class",
  FUNCTION = "Function",
  INTERFACE = "Interface",
}

/**
 * Use to allocate special conditions as no such values exists for TypeDoc. E.g. query for all resources.
 */
export enum KindStringSpecial {
  ALL = "All",
  COMPONENTS = "Components",
}

export type KindStringPossibilities =
  | KindString[]
  | KindString
  | KindStringSpecial;

export interface SearchQuery {
  name?: string;
  kindString?: KindStringPossibilities | undefined;
}

class State {
  searchQuery: SearchQuery | null = null;
}

export default handleActions<State, any>(
  {
    [findReflectionRequest.toString()]: (
      state,
      action: Action<SearchQuery>
    ): State => {
      return {
        ...state,
        searchQuery: action.payload!,
      };
    },
  },
  new State()
);

export { State as SearchState };
