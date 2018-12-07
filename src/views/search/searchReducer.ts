import { handleActions, Action } from "redux-actions";
import { findReflectionRequest } from "./searchActions";

export enum KindString {
  CLASS = "Class",
  FUNCTION = "Function",
  INTERFACE = "Interface",
}

export interface SearchQuery {
  name?: string;
  kindString?: KindString[] | undefined;
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
