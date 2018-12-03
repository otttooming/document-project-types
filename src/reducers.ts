import { combineReducers } from "redux";

import projectReducer, { ProjectState } from "./common/project/projectReducer";
import routingReducer, { RoutingState } from "./common/routing/routingReducer";
import dashboardReducer, {
  DashboardState,
} from "./views/dashboard/dashboardReducer";

import sidebarReducer, { SidebarState } from "./views/sidebar/sidebarReducer";
import searchReducer, { SearchState } from "./views/search/searchReducer";

const rootReducer = combineReducers({
  projectReducer,
  routingReducer,
  dashboardReducer,
  sidebarReducer,
  searchReducer,
});

export interface GlobalState {
  projectReducer: ProjectState;
  routingReducer: RoutingState;
  dashboardReducer: DashboardState;
  sidebarReducer: SidebarState;
  searchReducer: SearchState;
}

export default rootReducer;
