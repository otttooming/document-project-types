import { handleActions, Action } from "redux-actions";
import { findReflectionRequest } from "./searchActions";

export interface SearchQuery {
  name: string;
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
