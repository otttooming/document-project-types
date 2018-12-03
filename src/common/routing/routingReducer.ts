import { handleActions, Action } from "redux-actions";
import { setActiveViewRequest } from "./routingActions";

export enum ViewName {
  Dashboard = "dashboard",
  Search = "search",
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

export { State as RoutingState };
