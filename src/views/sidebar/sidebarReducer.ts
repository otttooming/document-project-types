import { handleActions, Action } from "redux-actions";
import { setActiveViewRequest } from "./sidebarActions";

export enum ViewName {
  Dashboard = "dashboard",
}

class State {
  activeView: ViewName = ViewName.Dashboard;
}

export default handleActions<State, any>(
  {
    [setActiveViewRequest.toString()]: (
      state,
      action: Action<ViewName>
    ): State => {
      return {
        ...state,
        activeView: action.payload!,
      };
    },
  },
  new State()
);

export { State as SidebarState };
