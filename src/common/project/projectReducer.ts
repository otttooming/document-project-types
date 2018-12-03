import { handleActions, Action } from "redux-actions";
import { setActiveComponentNameRequest } from "./projectActions";
import { ProjectReflection } from "../../common/projectReflection";

class State {
  activeComponentName: string | null = null;
  reflection: ProjectReflection | null = null;
}

export default handleActions<State, any>(
  {
    [setActiveComponentNameRequest.toString()]: (
      state,
      action: Action<string | null>
    ): State => {
      return {
        ...state,
        activeComponentName: action.payload!,
      };
    },
  },
  new State()
);

export { State as ProjectState };
